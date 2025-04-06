
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { type ApiError } from '@/types/api';

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
