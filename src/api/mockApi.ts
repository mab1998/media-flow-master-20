
import React from 'react';
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { adminService } from './services/adminService';
import { configService } from './services/configService';
import { legalService } from './services/legalService';
import { paymentService } from './services/paymentService';
import { downloadService } from './services/downloadService';
import { isAuthenticated } from './utils/storageHelpers';
import { useApiRequest } from './hooks/useApiRequest';

// Combine all services into a single API object
export const api = {
  ...videoService,
  ...authService,
  ...adminService,
  ...configService,
  ...legalService,
  ...paymentService,
  ...downloadService,
  
  // Check authentication status
  isAuthenticated
};

export { useApiRequest };
