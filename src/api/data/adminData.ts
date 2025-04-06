
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

// Mock subscription plans data
export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'annually';
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const mockPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Free',
    description: 'Basic features for occasional users',
    price: 0,
    billingCycle: 'monthly',
    features: ['720p quality', '5 downloads per day', 'Basic support'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Pro',
    description: 'Advanced features for regular users',
    price: 9.99,
    billingCycle: 'monthly',
    features: ['1080p quality', '30 downloads per day', 'Priority support', 'No ads'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Pro Annual',
    description: 'Pro features with annual billing',
    price: 99.99,
    billingCycle: 'annually',
    features: ['1080p quality', '30 downloads per day', 'Priority support', 'No ads', '2 months free'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'Unlimited',
    description: 'All features for power users',
    price: 19.99,
    billingCycle: 'monthly',
    features: ['4K quality', 'Unlimited downloads', 'Premium support', 'Batch downloading', 'Early access to new features'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '5',
    name: 'Unlimited Annual',
    description: 'Unlimited features with annual billing',
    price: 199.99,
    billingCycle: 'annually',
    features: ['4K quality', 'Unlimited downloads', 'Premium support', 'Batch downloading', 'Early access to new features', '2 months free'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '6',
    name: 'Student Pro',
    description: 'Pro features for students at a discounted rate',
    price: 4.99,
    billingCycle: 'monthly',
    features: ['1080p quality', '30 downloads per day', 'Priority support', 'No ads', 'Student verification required'],
    isActive: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
];

// Mock invoice data
export type Invoice = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  transactionId: string;
  createdAt: string;
};

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    planId: '2',
    planName: 'Pro',
    amount: 9.99,
    status: 'paid',
    paymentMethod: 'credit_card',
    transactionId: 'TXN-0001',
    createdAt: '2025-03-01T00:00:00Z'
  },
  {
    id: 'INV-002',
    userId: '2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    planId: '5',
    planName: 'Unlimited Annual',
    amount: 199.99,
    status: 'paid',
    paymentMethod: 'paypal',
    transactionId: 'TXN-0002',
    createdAt: '2025-02-15T00:00:00Z'
  },
  {
    id: 'INV-003',
    userId: '4',
    userName: 'Emily Davis',
    userEmail: 'emily@example.com',
    planId: '2',
    planName: 'Pro',
    amount: 9.99,
    status: 'paid',
    paymentMethod: 'credit_card',
    transactionId: 'TXN-0003',
    createdAt: '2025-03-18T00:00:00Z'
  },
  {
    id: 'INV-004',
    userId: '5',
    userName: 'Robert Brown',
    userEmail: 'robert@example.com',
    planId: '2',
    planName: 'Pro',
    amount: 9.99,
    status: 'failed',
    paymentMethod: 'credit_card',
    transactionId: 'TXN-0004',
    createdAt: '2025-04-01T00:00:00Z'
  },
  {
    id: 'INV-005',
    userId: '2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    planId: '5',
    planName: 'Unlimited Annual',
    amount: 199.99,
    status: 'refunded',
    paymentMethod: 'paypal',
    transactionId: 'TXN-0005',
    createdAt: '2024-08-15T00:00:00Z'
  },
  {
    id: 'INV-006',
    userId: '3',
    userName: 'Mike Wilson',
    userEmail: 'mike@example.com',
    planId: '2',
    planName: 'Pro',
    amount: 9.99,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    transactionId: 'TXN-0006',
    createdAt: '2025-04-05T00:00:00Z'
  }
];

// Mock download data
export type DownloadRecord = {
  id: string;
  userId: string;
  userName: string;
  videoTitle: string;
  platform: string;
  quality: string;
  fileSize: string;
  downloadDate: string;
  status: 'completed' | 'failed';
};

export const mockDownloads: DownloadRecord[] = [
  {
    id: 'DL-001',
    userId: '1',
    userName: 'John Doe',
    videoTitle: 'How to Make Pasta Carbonara',
    platform: 'YouTube',
    quality: '1080p',
    fileSize: '256 MB',
    downloadDate: '2025-04-05T14:30:00Z',
    status: 'completed'
  },
  {
    id: 'DL-002',
    userId: '2',
    userName: 'Sarah Johnson',
    videoTitle: 'Travel Vlog: Tokyo 2025',
    platform: 'YouTube',
    quality: '4K',
    fileSize: '1.2 GB',
    downloadDate: '2025-04-05T12:45:00Z',
    status: 'completed'
  },
  {
    id: 'DL-003',
    userId: '3',
    userName: 'Mike Wilson',
    videoTitle: 'Quick Workout Routine',
    platform: 'TikTok',
    quality: '720p',
    fileSize: '45 MB',
    downloadDate: '2025-04-05T10:15:00Z',
    status: 'completed'
  },
  {
    id: 'DL-004',
    userId: '4',
    userName: 'Emily Davis',
    videoTitle: 'Product Review: New Smartphone',
    platform: 'YouTube',
    quality: '1080p',
    fileSize: '350 MB',
    downloadDate: '2025-04-04T18:20:00Z',
    status: 'completed'
  },
  {
    id: 'DL-005',
    userId: '5',
    userName: 'Robert Brown',
    videoTitle: 'Guitar Tutorial: Beginner Chords',
    platform: 'Vimeo',
    quality: '720p',
    fileSize: '180 MB',
    downloadDate: '2025-04-04T15:30:00Z',
    status: 'failed'
  },
  {
    id: 'DL-006',
    userId: '2',
    userName: 'Sarah Johnson',
    videoTitle: 'DIY Home Decor Ideas',
    platform: 'Instagram',
    quality: '1080p',
    fileSize: '210 MB',
    downloadDate: '2025-04-04T09:45:00Z',
    status: 'completed'
  },
  {
    id: 'DL-007',
    userId: '1',
    userName: 'John Doe',
    videoTitle: 'News Highlights: April 2025',
    platform: 'Facebook',
    quality: '720p',
    fileSize: '120 MB',
    downloadDate: '2025-04-03T14:20:00Z',
    status: 'completed'
  },
  {
    id: 'DL-008',
    userId: '4',
    userName: 'Emily Davis',
    videoTitle: 'Cooking Class: French Pastries',
    platform: 'YouTube',
    quality: '1080p',
    fileSize: '450 MB',
    downloadDate: '2025-04-03T11:10:00Z',
    status: 'completed'
  }
];
