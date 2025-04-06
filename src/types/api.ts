
export type Platform = 'YouTube' | 'TikTok' | 'Facebook' | 'Instagram' | 'Twitter' | 'Vimeo';

export type VideoQuality = '240p' | '360p' | '480p' | '720p' | '1080p' | '2K' | '4K';

export type VideoFormat = {
  id: string;
  label: string;
  quality: VideoQuality;
  format: string;
  fileSize: string;
};

export type VideoInfo = {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  platform: Platform;
  author: string;
  duration: string;
  viewCount: string;
  availableFormats: VideoFormat[];
};

export type UserPlan = 'Free' | 'Pro' | 'Unlimited';

export type UserDownload = {
  id: string;
  videoInfo: VideoInfo;
  downloadDate: string;
  format: VideoFormat;
  status: 'completed' | 'failed';
};

export type User = {
  id: string;
  email: string;
  name: string;
  plan: UserPlan;
  downloads: UserDownload[];
  downloadCount: number;
  registrationDate: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ApiError = {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
};

export type PricingPlan = {
  id: string;
  name: UserPlan;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  downloadLimit: number | 'unlimited';
  qualityLimit: VideoQuality;
  platformLimit?: number | 'all';
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

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
