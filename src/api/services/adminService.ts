
import React from 'react';
import { adminStats, mockUsersList, mockPlans, mockInvoices, mockDownloads } from "../data/adminData";
import { type User, type SubscriptionPlan, type Invoice, type DownloadRecord } from "@/types/api";
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
  },
  
  // Add a new user
  addUser: async ({ name, email, plan }: { name: string; email: string; plan: "Free" | "Pro" | "Unlimited" }): Promise<User> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);
    
    // Check if email is already in use
    const existingUser = mockUsersList.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw createApiError(409, 'Email is already in use');
    }
    
    // Create new user (in a real app, this would save to database)
    const newUser: User = {
      id: `${mockUsersList.length + 1}`,
      name,
      email,
      plan,
      downloads: [],
      downloadCount: 0,
      registrationDate: new Date().toISOString()
    };
    
    // In a real app, this would update the database
    // Here we just return the new user
    return newUser;
  },
  
  // Delete a user
  deleteUser: async (userId: string): Promise<{ success: boolean }> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(700);
    
    // In a real application, this would delete the user from the database
    // Here we just return success if the user exists
    const userExists = mockUsersList.some(user => user.id === userId);
    
    if (!userExists) {
      throw createApiError(404, 'User not found');
    }
    
    return { success: true };
  },
  
  // Get all subscription plans
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(600);
    
    return mockPlans;
  },
  
  // Get a single plan by ID
  getPlanById: async (planId: string): Promise<SubscriptionPlan> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(500);

    // Find plan by ID
    const plan = mockPlans.find(plan => plan.id === planId);
    
    if (!plan) {
      throw createApiError(404, 'Plan not found');
    }

    return plan;
  },
  
  // Create a new plan
  createPlan: async (planData: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<SubscriptionPlan> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(800);
    
    // In a real application, this would create a new plan in the database
    // Here we just generate a new ID and return the plan data
    const newPlan: SubscriptionPlan = {
      ...planData,
      id: `${mockPlans.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newPlan;
  },
  
  // Update an existing plan
  updatePlan: async (planId: string, planData: Partial<Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SubscriptionPlan> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(700);
    
    // Find plan by ID
    const plan = mockPlans.find(plan => plan.id === planId);
    
    if (!plan) {
      throw createApiError(404, 'Plan not found');
    }
    
    // In a real application, this would update the plan in the database
    // Here we just return the updated plan data
    const updatedPlan: SubscriptionPlan = {
      ...plan,
      ...planData,
      updatedAt: new Date().toISOString()
    };
    
    return updatedPlan;
  },
  
  // Delete a plan
  deletePlan: async (planId: string): Promise<{ success: boolean }> => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(700);
    
    // In a real application, this would delete the plan from the database
    // Here we just return success if the plan exists
    const planExists = mockPlans.some(plan => plan.id === planId);
    
    if (!planExists) {
      throw createApiError(404, 'Plan not found');
    }
    
    return { success: true };
  },
  
  // Get invoice history (with pagination)
  getInvoices: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(600);

    // Paginate invoices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedInvoices = mockInvoices.slice(startIndex, endIndex);
    
    return {
      invoices: paginatedInvoices,
      totalCount: mockInvoices.length,
      page,
      limit,
      totalPages: Math.ceil(mockInvoices.length / limit)
    };
  },
  
  // Get download records (with pagination)
  getDownloads: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    // Check authentication
    const token = getAuthToken();
    if (!token) {
      throw createApiError(401, 'Not authenticated');
    }

    // Simulate API delay
    await delay(600);

    // Paginate downloads
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDownloads = mockDownloads.slice(startIndex, endIndex);
    
    return {
      downloads: paginatedDownloads,
      totalCount: mockDownloads.length,
      page,
      limit,
      totalPages: Math.ceil(mockDownloads.length / limit)
    };
  }
};
