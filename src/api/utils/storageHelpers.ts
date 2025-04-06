
import { User } from "@/types/api";

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Save user to local storage
export const saveCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Mock auth token for session management
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
