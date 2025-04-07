
import { type VideoInfo, type UserDownload } from "@/types/api";
import { delay, simulateRandomFailure, createApiError } from "../utils/apiHelpers";
import { getCurrentUser, saveCurrentUser, getAuthToken } from "../utils/storageHelpers";
import { generateMockVideoInfo } from "../utils/videoInfoGenerator";

export const videoService = {
  // Fetch video information from a URL
  fetchVideoInfo: async (url: string): Promise<VideoInfo> => {
    if (!url) {
      throw createApiError(400, 'URL is required');
    }

    // Simulate API delay
    await delay(1500);

    // Simulate random failure
    if (simulateRandomFailure(0.1)) {
      throw createApiError(500, 'Failed to fetch video information. Please try again.');
    }

    // Generate mock video info based on the URL
    return generateMockVideoInfo(url);
  },

  // Download a video
  downloadVideo: async (videoId: string, formatId: string): Promise<UserDownload> => {
    const token = getAuthToken();
    
    // Check authentication - REQUIRED for all downloads now
    if (!token) {
      throw createApiError(401, 'Authentication required to download videos. Please log in.');
    }
    
    let user = getCurrentUser();
    if (!user) {
      throw createApiError(401, 'User not found. Please log in again.');
    }
    
    // Simulate API delay
    await delay(2000);

    // Simulate random failure
    if (simulateRandomFailure(0.15)) {
      throw createApiError(500, 'Download failed. Please try again.');
    }

    // Get the video info
    const videoUrl = localStorage.getItem(`video_${videoId}_url`);
    
    if (!videoUrl) {
      throw createApiError(404, 'Video not found');
    }

    const videoInfo = await videoService.fetchVideoInfo(videoUrl);
    
    // Find the format
    const format = videoInfo.availableFormats.find(fmt => fmt.id === formatId);
    
    if (!format) {
      throw createApiError(404, 'Format not found');
    }

    // Check download limits for plans
    if (user.plan === 'Free' && user.downloads.length >= 5) {
      throw createApiError(403, 'Free plan limited to 5 downloads per day. Please upgrade your plan.');
    }

    if (user.plan === 'Pro' && user.downloads.length >= 30) {
      throw createApiError(403, 'Pro plan limited to 30 downloads per day. Please upgrade to Unlimited for more downloads.');
    }

    // Check quality limits for plans
    const qualityRanking: Record<string, number> = {
      '240p': 1,
      '360p': 2,
      '480p': 3,
      '720p': 4,
      '1080p': 5,
      '2K': 6,
      '4K': 7
    };

    if (user.plan === 'Free' && qualityRanking[format.quality] > qualityRanking['720p']) {
      throw createApiError(403, 'Free plan limited to 720p quality. Please upgrade your plan for higher quality downloads.');
    }

    if (user.plan === 'Pro' && qualityRanking[format.quality] > qualityRanking['1080p']) {
      throw createApiError(403, 'Pro plan limited to 1080p quality. Please upgrade to Unlimited for 4K downloads.');
    }

    // Create download record
    const downloadRecord: UserDownload = {
      id: `dl-${Date.now()}`,
      videoInfo,
      downloadDate: new Date().toISOString(),
      format,
      status: 'completed'
    };

    // Update user's download history
    user.downloads = [downloadRecord, ...user.downloads];
    user.downloadCount += 1;
    saveCurrentUser(user);

    return downloadRecord;
  },

  // Get user downloads
  getUserDownloads: async (): Promise<UserDownload[]> => {
    const token = getAuthToken();
    
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(1000);

    const user = getCurrentUser();
    if (!user) {
      throw createApiError(404, 'User not found');
    }

    return user.downloads;
  }
};
