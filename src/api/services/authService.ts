
import { type LoginRequest, type SignupRequest, type AuthResponse, type User } from "@/types/api";
import { delay, simulateRandomFailure, createApiError } from "../utils/apiHelpers";
import { saveAuthToken, saveCurrentUser, getCurrentUser, getAuthToken, clearAuthToken } from "../utils/storageHelpers";
import { mockUser } from "../data";

export const authService = {
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
  }
};
