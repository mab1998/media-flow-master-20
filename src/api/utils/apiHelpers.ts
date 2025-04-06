
import { type ApiError } from "@/types/api";

// Helper for simulating network delay
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Helper for random failures to simulate real API conditions
export const simulateRandomFailure = (failureRate: number = 0.1): boolean => {
  return Math.random() < failureRate;
};

// Mock API error response
export const createApiError = (statusCode: number, message: string, errors?: Record<string, string[]>): ApiError => {
  return { statusCode, message, errors };
};
