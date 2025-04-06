
import React from 'react';
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { adminService } from './services/adminService';
import { configService } from './services/configService';
import { isAuthenticated } from './utils/storageHelpers';
import { useApiRequest } from './hooks/useApiRequest';

// Combine all services into a single API object
export const api = {
  ...videoService,
  ...authService,
  ...adminService,
  ...configService,
  
  // Check authentication status
  isAuthenticated
};

export { useApiRequest };
