
import React from 'react';
import { authService } from './services/authService';
import { videoService } from './services/videoService';
import { adminService } from './services/adminService';
import { configService } from './services/configService';
import { legalService } from './services/legalService';
import { paymentService } from './services/paymentService';
import { downloadService } from './services/downloadService';
import { isAuthenticated } from './utils/storageHelpers';

import { realAuthService, realVideoService, realDownloadService } from './services/realServices';
import { realAdminService } from './services/realAdminService';
import { useApiMode } from '@/contexts/ApiModeContext';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { type ApiError } from '@/types/api';

// Combine all mock services into a single API object
const mockApi = {
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

// Real API services
const realApi = {
  ...realVideoService,
  ...realAuthService,
  ...realAdminService, // Use real admin services
  ...configService, // Keep using mock config services
  ...legalService, // Keep using mock legal services
  ...paymentService, // Keep using mock payment services
  ...realDownloadService,
  
  // Check authentication status
  isAuthenticated
};

// Custom hook for API requests with toggle support
export function useApiRequest<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  options: { 
    onSuccess?: (data: T) => void, 
    onError?: (error: any) => void,
    successMessage?: string,
    errorMessage?: string
  } = {}
) {
  const { apiMode } = useApiMode();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<T | null>(null);

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

// Hook for getting the API based on the current mode
export const useApi = () => {
  const { apiMode } = useApiMode();
  return apiMode === 'mock' ? mockApi : realApi;
};

// Export both mock and real APIs (for use in places without hooks)
export const api = new Proxy({} as typeof mockApi, {
  get: (target, prop) => {
    const mode = localStorage.getItem('apiMode') || 'mock';
    const selectedApi = mode === 'mock' ? mockApi : realApi;
    return selectedApi[prop as keyof typeof mockApi];
  }
});
