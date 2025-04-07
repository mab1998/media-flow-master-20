
import { type ApiError } from '@/types/api';

// Base URL for API server
const API_BASE_URL = 'http://localhost:8000/api';

// Helper for handling API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let statusCode = response.status;
    let errors;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errors = errorData.errors;
    } catch (e) {
      // If parsing fails, use the default error message
    }

    const apiError: ApiError = {
      statusCode,
      message: errorMessage,
      errors
    };

    throw apiError;
  }

  return response.json();
};

// Helper for making API requests
const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error) {
      const apiError: ApiError = {
        statusCode: 0,
        message: error.message
      };
      throw apiError;
    }
    throw error;
  }
};

// Export request methods
export const realApiClient = {
  get: <T>(endpoint: string, options: RequestInit = {}): Promise<T> =>
    makeRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> =>
    makeRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    }),

  put: <T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> =>
    makeRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    }),

  delete: <T>(endpoint: string, options: RequestInit = {}): Promise<T> =>
    makeRequest<T>(endpoint, { ...options, method: 'DELETE' })
};
