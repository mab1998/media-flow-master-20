
import { type UserDownload } from "@/types/api";
import { delay, simulateRandomFailure, createApiError } from "../utils/apiHelpers";
import { getCurrentUser, getAuthToken } from "../utils/storageHelpers";

export const downloadService = {
  // Get user downloads with pagination and filtering
  getUserDownloads: async (
    page: number = 1, 
    limit: number = 10,
    filter?: { platform?: string; status?: string }
  ): Promise<{ downloads: UserDownload[]; total: number }> => {
    const token = getAuthToken();
    
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);

    // Random failure simulation (10% chance)
    if (simulateRandomFailure(0.1)) {
      throw createApiError(500, 'Failed to fetch downloads. Please try again.');
    }

    const user = getCurrentUser();
    if (!user) {
      throw createApiError(404, 'User not found');
    }

    let downloads = [...user.downloads];

    // Apply filtering if specified
    if (filter) {
      if (filter.platform) {
        downloads = downloads.filter(d => d.videoInfo.platform === filter.platform);
      }
      if (filter.status) {
        downloads = downloads.filter(d => d.status === filter.status);
      }
    }

    // Calculate pagination
    const total = downloads.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDownloads = downloads.slice(startIndex, endIndex);

    return {
      downloads: paginatedDownloads,
      total
    };
  },
  
  // Delete a download from history
  deleteDownload: async (downloadId: string): Promise<void> => {
    const token = getAuthToken();
    
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }
    
    // Simulate delay
    await delay(500);

    const user = getCurrentUser();
    if (!user) {
      throw createApiError(404, 'User not found');
    }

    const downloadIndex = user.downloads.findIndex(d => d.id === downloadId);
    if (downloadIndex === -1) {
      throw createApiError(404, 'Download record not found');
    }

    // Remove the download from history
    user.downloads = user.downloads.filter(d => d.id !== downloadId);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};
