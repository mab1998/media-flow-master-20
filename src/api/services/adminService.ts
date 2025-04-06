
import React from 'react';
import { adminStats, mockUsersList } from "../data/adminData";
import { type User } from "@/types/api";
import { delay, createApiError } from "../utils/apiHelpers";
import { getAuthToken } from "../utils/storageHelpers";

export const adminService = {
  // Get admin dashboard statistics
  getAdminStats: async () => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);

    // Return mock statistics
    return adminStats;
  },

  // Get list of users (with pagination)
  getUsers: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(600);

    // Paginate users
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = mockUsersList.slice(startIndex, endIndex);
    
    return {
      users: paginatedUsers,
      totalCount: mockUsersList.length,
      page,
      limit,
      totalPages: Math.ceil(mockUsersList.length / limit)
    };
  },

  // Get a single user by ID
  getUserById: async (userId: string): Promise<User> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(500);

    // Find user by ID
    const user = mockUsersList.find(user => user.id === userId);
    
    if (!user) {
      throw createApiError(404, 'User not found');
    }

    return user;
  }
};
