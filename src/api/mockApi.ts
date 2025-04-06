
import { toast } from '@/hooks/use-toast';
import { 
  type VideoInfo, 
  type LoginRequest, 
  type SignupRequest, 
  type AuthResponse, 
  type ApiError, 
  type User,
  type UserDownload,
  type VideoFormat
} from '@/types/api';
import { mockUser, generateMockVideoInfo } from './mockData';

// Helper for simulating network delay
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Helper for random failures to simulate real API conditions
const simulateRandomFailure = (failureRate: number = 0.1): boolean => {
  return Math.random() < failureRate;
};

// Mock API error response
const createApiError = (statusCode: number, message: string, errors?: Record<string, string[]>): ApiError => {
  return { statusCode, message, errors };
};

// Get current user from local storage
const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Save user to local storage
const saveCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Mock auth token for session management
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const saveAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

// API Methods
export const api = {
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

  // Login user
  loginUser: async (credentials: LoginRequest): Promise<AuthResponse> => {
    if (!credentials.email || !credentials.password) {
      throw createApiError(400, 'Email and password are required');
    }

    // Simulate API delay
    await delay(1000);

    // Simulate validation
    if (credentials.email !== 'user@example.com') {
      throw createApiError(401, 'Invalid email or password');
    }

    if (credentials.password !== 'password') {
      throw createApiError(401, 'Invalid email or password');
    }

    // Create mock token
    const token = `mock-jwt-token-${Date.now()}`;
    saveAuthToken(token);
    saveCurrentUser(mockUser);

    return {
      token,
      user: mockUser
    };
  },

  // Signup user
  signupUser: async (signupData: SignupRequest): Promise<AuthResponse> => {
    // Validate input
    if (!signupData.email || !signupData.password || !signupData.confirmPassword) {
      throw createApiError(400, 'All fields are required');
    }

    if (signupData.password !== signupData.confirmPassword) {
      throw createApiError(400, 'Passwords do not match', {
        confirmPassword: ['Passwords do not match']
      });
    }

    if (signupData.password.length < 6) {
      throw createApiError(400, 'Password must be at least 6 characters', {
        password: ['Password must be at least 6 characters']
      });
    }

    // Simulate API delay
    await delay(1500);

    // Simulate existing user check
    if (signupData.email === 'user@example.com' && simulateRandomFailure(0.8)) {
      throw createApiError(409, 'User already exists with this email');
    }

    // Create new user
    const newUser: User = {
      ...mockUser,
      email: signupData.email,
      name: signupData.name || signupData.email.split('@')[0],
      registrationDate: new Date().toISOString()
    };

    // Create mock token
    const token = `mock-jwt-token-${Date.now()}`;
    saveAuthToken(token);
    saveCurrentUser(newUser);

    return {
      token,
      user: newUser
    };
  },

  // Logout user
  logoutUser: async (): Promise<void> => {
    // Simulate API delay
    await delay(500);
    
    clearAuthToken();
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const token = getAuthToken();
    
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);

    const user = getCurrentUser();
    if (!user) {
      throw createApiError(404, 'User not found');
    }

    return user;
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
  },

  // Download a video
  downloadVideo: async (videoId: string, formatId: string): Promise<UserDownload> => {
    const token = getAuthToken();
    
    // Check authentication for tracking downloads
    let user = getCurrentUser();
    
    // Simulate API delay
    await delay(2000);

    // Simulate random failure
    if (simulateRandomFailure(0.15)) {
      throw createApiError(500, 'Download failed. Please try again.');
    }

    // If user is authenticated, save this download to their history
    if (token && user) {
      // Get the video info (in a real app we would check if we already have it)
      const videoUrl = localStorage.getItem(`video_${videoId}_url`);
      
      if (!videoUrl) {
        throw createApiError(404, 'Video not found');
      }

      const videoInfo = await api.fetchVideoInfo(videoUrl);
      
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
    }

    // For anonymous users, just return a fake download record
    const videoUrl = localStorage.getItem(`video_${videoId}_url`);
    if (!videoUrl) {
      throw createApiError(404, 'Video not found');
    }

    const videoInfo = await api.fetchVideoInfo(videoUrl);
    const format = videoInfo.availableFormats.find(fmt => fmt.id === formatId);
    
    if (!format) {
      throw createApiError(404, 'Format not found');
    }

    // For free users, check quality limit
    if (format.quality !== '240p' && format.quality !== '360p' && format.quality !== '480p' && format.quality !== '720p') {
      throw createApiError(403, 'Free users can only download up to 720p quality. Please sign up for higher quality downloads.');
    }
    
    return {
      id: `dl-${Date.now()}`,
      videoInfo,
      downloadDate: new Date().toISOString(),
      format,
      status: 'completed'
    };
  },

  // Check authentication status
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  }
};

// Custom hook for handling API requests with loading and error states
export function useApiRequest<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  options: { 
    onSuccess?: (data: T) => void, 
    onError?: (error: ApiError) => void,
    successMessage?: string,
    errorMessage?: string
  } = {}
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<ApiError | null>(null);
  const [data, setData] = React.useState<T | null>(null);

  const execute = async (...args: Args): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      setData(result);
      setIsLoading(false);
      
      if (options.successMessage) {
        toast({
          title: 'Success',
          description: options.successMessage,
        });
      }
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setIsLoading(false);
      
      const apiError = err as ApiError;
      setError(apiError);
      
      if (options.errorMessage || apiError.message) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: options.errorMessage || apiError.message,
        });
      }
      
      if (options.onError) {
        options.onError(apiError);
      }
      
      return null;
    }
  };

  return { execute, isLoading, error, data };
}
