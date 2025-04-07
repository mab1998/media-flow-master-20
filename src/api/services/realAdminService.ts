
import { realApiClient } from '../realApi';
import {
  type User,
  type SubscriptionPlan,
  type DownloadRecord,
  type Invoice,
  type AdminStats
} from '@/types/api';

export const realAdminService = {
  // Get admin dashboard statistics
  getAdminStats: async (): Promise<AdminStats> => {
    return realApiClient.get<AdminStats>('/admin/stats');
  },

  // Get list of users (with pagination)
  getUsers: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return realApiClient.get<{
      users: User[];
      totalCount: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/admin/users?page=${page}&limit=${limit}`);
  },

  // Get a single user by ID
  getUserById: async (userId: string): Promise<User> => {
    return realApiClient.get<User>(`/admin/users/${userId}`);
  },
  
  // Add a new user
  addUser: async ({ name, email, plan }: { name: string; email: string; plan: "Free" | "Pro" | "Unlimited" }): Promise<User> => {
    return realApiClient.post<User>('/admin/users', { name, email, plan });
  },
  
  // Delete a user
  deleteUser: async (userId: string): Promise<{ success: boolean }> => {
    await realApiClient.delete<void>(`/admin/users/${userId}`);
    return { success: true };
  },
  
  // Get all subscription plans
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    return realApiClient.get<SubscriptionPlan[]>('/admin/plans');
  },
  
  // Get a single plan by ID
  getPlanById: async (planId: string): Promise<SubscriptionPlan> => {
    return realApiClient.get<SubscriptionPlan>(`/admin/plans/${planId}`);
  },
  
  // Create a new plan
  createPlan: async (planData: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<SubscriptionPlan> => {
    return realApiClient.post<SubscriptionPlan>('/admin/plans', planData);
  },
  
  // Update an existing plan
  updatePlan: async (planId: string, planData: Partial<Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>>): Promise<SubscriptionPlan> => {
    return realApiClient.put<SubscriptionPlan>(`/admin/plans/${planId}`, planData);
  },
  
  // Delete a plan
  deletePlan: async (planId: string): Promise<{ success: boolean }> => {
    await realApiClient.delete<void>(`/admin/plans/${planId}`);
    return { success: true };
  },
  
  // Get invoice history (with pagination)
  getInvoices: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return realApiClient.get<{
      invoices: Invoice[];
      totalCount: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/admin/invoices?page=${page}&limit=${limit}`);
  },
  
  // Get download records (with pagination)
  getDownloads: async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return realApiClient.get<{
      downloads: DownloadRecord[];
      totalCount: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/admin/downloads?page=${page}&limit=${limit}`);
  },

  // Get a single invoice by ID
  getInvoiceById: async (invoiceId: string): Promise<Invoice> => {
    return realApiClient.get<Invoice>(`/admin/invoices/${invoiceId}`);
  },

  // Get a single download by ID
  getDownloadById: async (downloadId: string): Promise<DownloadRecord> => {
    return realApiClient.get<DownloadRecord>(`/admin/downloads/${downloadId}`);
  }
};
