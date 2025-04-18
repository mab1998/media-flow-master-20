
import { realApiClient } from '../realApi';
import { 
  type LoginRequest, 
  type SignupRequest, 
  type AuthResponse, 
  type User, 
  type VideoInfo,
  type UserDownload
} from '@/types/api';
import { saveAuthToken, saveCurrentUser } from '../utils/storageHelpers';

export const realAuthService = {
  // Login user
  loginUser: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await realApiClient.post<AuthResponse>('/auth/login', credentials);
    
    // Save token and user data
    if (response.token) {
      saveAuthToken(response.token);
      if (response.user) {
        saveCurrentUser(response.user);
      }
    }
    
    return response;
  },

  // Signup user
  signupUser: async (signupData: SignupRequest): Promise<AuthResponse> => {
    const response = await realApiClient.post<AuthResponse>('/auth/signup', signupData);
    
    // Save token and user data
    if (response.token) {
      saveAuthToken(response.token);
      if (response.user) {
        saveCurrentUser(response.user);
      }
    }
    
    return response;
  },

  // Logout user
  logoutUser: async (): Promise<void> => {
    // Just client-side logout for this demo
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    return realApiClient.get<User>('/auth/me');
  }
};

export const realVideoService = {
  // Fetch video information from a URL
  fetchVideoInfo: async (url: string): Promise<VideoInfo> => {
    return realApiClient.post<VideoInfo>('/videos/info', { url });
  },

  // Download a video
  downloadVideo: async (videoId: string, formatId: string): Promise<UserDownload> => {
    const videoUrl = localStorage.getItem(`video_${videoId}_url`);
    return realApiClient.post<UserDownload>('/downloads', { videoId, formatId, videoUrl });
  },

  // Get user downloads
  getUserDownloads: async (): Promise<UserDownload[]> => {
    const response = await realApiClient.get<{ downloads: UserDownload[] }>('/downloads');
    return response.downloads;
  }
};

export const realDownloadService = {
  // Get user downloads with pagination and filtering
  getUserDownloads: async (
    page: number = 1, 
    limit: number = 10,
    filter?: { platform?: string; status?: string }
  ): Promise<{ downloads: UserDownload[]; total: number }> => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    if (filter?.platform && filter.platform !== 'all') {
      queryParams.append('platform', filter.platform);
    }
    
    if (filter?.status && filter.status !== 'all') {
      queryParams.append('status', filter.status);
    }
    
    return realApiClient.get<{ downloads: UserDownload[]; total: number }>(`/downloads?${queryParams}`);
  },
  
  // Delete a download from history
  deleteDownload: async (downloadId: string): Promise<void> => {
    await realApiClient.delete<void>(`/downloads/${downloadId}`);
  }
};
