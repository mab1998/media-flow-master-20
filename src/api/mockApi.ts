
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { isAuthenticated } from './utils/storageHelpers';
import { useApiRequest } from './hooks/useApiRequest';

// Combine all services into a single API object
export const api = {
  ...videoService,
  ...authService,
  
  // Check authentication status
  isAuthenticated
};

export { useApiRequest };
