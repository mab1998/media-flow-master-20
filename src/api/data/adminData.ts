
import { type User } from "@/types/api";

// Mock admin statistics data
export type AdminStats = {
  totalUsers: number;
  totalDownloads: number;
  activeUsers: number;
  premiumUsers: number;
  downloadsByPlatform: Record<string, number>;
  downloadsByDay: Array<{ date: string; count: number }>;
};

// Mock admin dashboard statistics
export const adminStats: AdminStats = {
  totalUsers: 1245,
  totalDownloads: 8721,
  activeUsers: 867,
  premiumUsers: 342,
  downloadsByPlatform: {
    YouTube: 4230,
    TikTok: 2183,
    Instagram: 1204,
    Facebook: 653,
    Twitter: 301,
    Vimeo: 150
  },
  downloadsByDay: [
    { date: "2025-03-30", count: 142 },
    { date: "2025-03-31", count: 165 },
    { date: "2025-04-01", count: 179 },
    { date: "2025-04-02", count: 189 },
    { date: "2025-04-03", count: 204 },
    { date: "2025-04-04", count: 215 },
    { date: "2025-04-05", count: 232 }
  ]
};

// Mock list of users for admin panel
export const mockUsersList: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    plan: 'Pro',
    downloads: [],
    downloadCount: 37,
    registrationDate: '2024-11-15T00:00:00Z'
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    plan: 'Unlimited',
    downloads: [],
    downloadCount: 128,
    registrationDate: '2024-10-23T00:00:00Z'
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Wilson',
    plan: 'Free',
    downloads: [],
    downloadCount: 12,
    registrationDate: '2025-01-07T00:00:00Z'
  },
  {
    id: '4',
    email: 'emily@example.com',
    name: 'Emily Davis',
    plan: 'Pro',
    downloads: [],
    downloadCount: 56,
    registrationDate: '2024-12-18T00:00:00Z'
  },
  {
    id: '5',
    email: 'robert@example.com',
    name: 'Robert Brown',
    plan: 'Free',
    downloads: [],
    downloadCount: 8,
    registrationDate: '2025-02-02T00:00:00Z'
  }
];
