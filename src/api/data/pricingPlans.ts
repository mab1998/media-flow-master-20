
import { type PricingPlan } from "@/types/api";

// Mock pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    billingPeriod: 'forever',
    description: 'Perfect for occasional downloads',
    features: [
      'Up to 720p quality',
      '5 downloads per day',
      'YouTube, Facebook support',
      'Basic support',
      'Standard processing speed'
    ],
    downloadLimit: 5,
    qualityLimit: '720p'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    billingPeriod: 'per month',
    description: 'Great for regular users',
    features: [
      'Up to 1080p quality',
      '30 downloads per day',
      'All platforms support',
      'Priority support',
      'Faster processing speed',
      'No ads'
    ],
    isPopular: true,
    downloadLimit: 30,
    qualityLimit: '1080p',
    platformLimit: 'all'
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: '$19.99',
    billingPeriod: 'per month',
    description: 'Best for power users',
    features: [
      'Up to 4K quality',
      'Unlimited downloads',
      'All platforms support',
      'Premium support',
      'Fastest processing speed',
      'No ads',
      'Batch downloading',
      'Early access to new features'
    ],
    downloadLimit: 'unlimited',
    qualityLimit: '4K',
    platformLimit: 'all'
  }
];
