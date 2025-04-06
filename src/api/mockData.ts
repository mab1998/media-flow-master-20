
import { type Feature, type FAQItem, type PricingPlan, type Platform, type User, type VideoInfo } from "@/types/api";
import { DownloadCloud, Zap, Globe, Shield, Clock, RefreshCw, Users, Star, Infinity, HelpCircle } from "lucide-react";

// Mock platforms data
export const platforms: Platform[] = ['YouTube', 'TikTok', 'Facebook', 'Instagram', 'Twitter', 'Vimeo'];

// Mock features data
export const features: Feature[] = [
  {
    id: '1',
    title: 'High-Quality Downloads',
    description: 'Download videos in HD and 4K quality for the best viewing experience.',
    icon: 'Star'
  },
  {
    id: '2',
    title: 'Multi-Platform Support',
    description: 'Download from YouTube, TikTok, Facebook, Instagram, Twitter, and more.',
    icon: 'Globe'
  },
  {
    id: '3',
    title: 'Lightning Fast Processing',
    description: 'Our servers process your download requests in seconds.',
    icon: 'Zap'
  },
  {
    id: '4',
    title: 'No Account Required',
    description: 'Quick downloads with no registration needed for basic features.',
    icon: 'Users'
  },
  {
    id: '5',
    title: 'Secure Downloads',
    description: 'All downloads are secured with encryption and free from malware.',
    icon: 'Shield'
  },
  {
    id: '6',
    title: 'Unlimited Downloads',
    description: 'Premium plans offer unlimited downloads with no daily limits.',
    icon: 'Infinity'
  },
  {
    id: '7',
    title: 'Batch Processing',
    description: 'Download multiple videos simultaneously with our Pro plans.',
    icon: 'RefreshCw'
  },
  {
    id: '8',
    title: '24/7 Support',
    description: 'Our customer support team is available around the clock.',
    icon: 'HelpCircle'
  }
];

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

// Mock FAQ data
export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I download a video?',
    answer: 'Simply paste the URL of the video you want to download in the input field on our homepage, click "Get Video," and then select your preferred format and quality before clicking the download button.'
  },
  {
    id: '2',
    question: 'Which platforms are supported?',
    answer: 'OmniVideo supports a wide range of platforms including YouTube, TikTok, Facebook, Instagram, Twitter, and Vimeo. We regularly add support for new platforms.'
  },
  {
    id: '3',
    question: 'Is there a limit to how many videos I can download?',
    answer: 'Free users can download up to 5 videos per day. Pro users have a limit of 30 downloads per day, while Unlimited plan subscribers can download as many videos as they want with no restrictions.'
  },
  {
    id: '4',
    question: 'What video quality options are available?',
    answer: 'Depending on your subscription plan, you can download videos in qualities ranging from 240p to 4K. Free users can download up to 720p, Pro users up to 1080p, and Unlimited users can access 4K quality when available.'
  },
  {
    id: '5',
    question: 'Do I need to create an account to download videos?',
    answer: 'No, you don\'t need an account to use basic features with our Free tier. However, creating an account lets you track your downloads and access premium features if you subscribe to a paid plan.'
  },
  {
    id: '6',
    question: 'Is downloading videos from these platforms legal?',
    answer: 'OmniVideo is designed for downloading videos for personal use only. Always respect copyright laws and the terms of service of the platforms you\'re downloading from. Do not download or share copyrighted content without permission.'
  },
  {
    id: '7',
    question: 'How do I upgrade my subscription plan?',
    answer: 'You can upgrade your subscription by visiting the Pricing page, selecting your preferred plan, and following the payment process. If you already have an account, make sure you\'re logged in first.'
  }
];

// Mock User Data
export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Test User',
  plan: 'Free',
  downloads: [],
  downloadCount: 0,
  registrationDate: '2023-04-06T00:00:00Z'
};

// Mock Video Data Generator
export const generateMockVideoInfo = (url: string): VideoInfo => {
  const platformMap: Record<string, Platform> = {
    'youtube': 'YouTube',
    'youtu.be': 'YouTube',
    'tiktok': 'TikTok',
    'facebook': 'Facebook',
    'fb.com': 'Facebook',
    'instagram': 'Instagram',
    'twitter': 'Twitter',
    'vimeo': 'Vimeo'
  };

  // Detect platform from URL
  let detectedPlatform: Platform = 'YouTube';
  for (const [urlPart, platform] of Object.entries(platformMap)) {
    if (url.includes(urlPart)) {
      detectedPlatform = platform;
      break;
    }
  }

  // Generate a pseudorandom ID based on the URL
  const randomId = Math.random().toString(36).substring(2, 10);

  // Platform-specific mock titles
  const platformTitles: Record<Platform, string[]> = {
    'YouTube': [
      'Ultimate Guide to Modern Web Development',
      'The Best Tech Review of 2023',
      'How to Build Your First App in 10 Minutes'
    ],
    'TikTok': [
      'This Dance Trend Is Taking Over',
      'Wait For It... #Viral',
      'Quick Life Hack You Need to Know'
    ],
    'Facebook': [
      'Our Amazing Family Vacation 2023',
      'Company Anniversary Celebration',
      'Live Q&A Session with Our CEO'
    ],
    'Instagram': [
      'Morning Routine for Productivity',
      'Behind the Scenes of Our Photoshoot',
      'New Collection Sneak Peek'
    ],
    'Twitter': [
      'Breaking News: Tech Conference Highlights',
      'This Thread Will Change How You Think',
      'Live Update from the Event'
    ],
    'Vimeo': [
      'Award-winning Short Film: Echoes',
      'Professional Studio Setup Tutorial',
      'Cinematic Travel Montage: Japan'
    ]
  };

  // Select a random title for the platform
  const titles = platformTitles[detectedPlatform];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  // Generate random durations
  const minutes = Math.floor(Math.random() * 30) + 1;
  const seconds = Math.floor(Math.random() * 60);
  const paddedSeconds = seconds.toString().padStart(2, '0');
  const duration = `${minutes}:${paddedSeconds}`;

  // Mock formats based on platform and random availability
  const formats = [
    { id: `fmt1-${randomId}`, label: '240p', quality: '240p', format: 'MP4', fileSize: '10 MB' },
    { id: `fmt2-${randomId}`, label: '360p', quality: '360p', format: 'MP4', fileSize: '20 MB' },
    { id: `fmt3-${randomId}`, label: '480p', quality: '480p', format: 'MP4', fileSize: '40 MB' },
    { id: `fmt4-${randomId}`, label: '720p', quality: '720p', format: 'MP4', fileSize: '80 MB' },
    { id: `fmt5-${randomId}`, label: '1080p', quality: '1080p', format: 'MP4', fileSize: '160 MB' },
    { id: `fmt6-${randomId}`, label: '2K', quality: '2K', format: 'MP4', fileSize: '300 MB' },
    { id: `fmt7-${randomId}`, label: '4K', quality: '4K', format: 'MP4', fileSize: '600 MB' },
    { id: `fmt8-${randomId}`, label: 'MP3 Audio', quality: '240p', format: 'MP3', fileSize: '5 MB' }
  ];

  // Randomize format availability based on platform
  let availableFormats = formats;
  if (detectedPlatform === 'TikTok' || detectedPlatform === 'Instagram') {
    // These platforms typically have fewer format options
    availableFormats = formats.slice(2, 5);
  } else if (Math.random() > 0.7) {
    // Randomly limit formats sometimes
    const formatCount = Math.floor(Math.random() * 5) + 3;
    availableFormats = formats.slice(0, formatCount);
  }

  // Generate mock platform-specific thumbnails
  const platformThumbnails = {
    'YouTube': 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    'TikTok': 'https://i.pinimg.com/originals/c9/6b/6e/c96b6e549899b7155e86d31b3c3b747c.jpg',
    'Facebook': 'https://cdn.pixabay.com/photo/2021/02/08/15/38/social-media-5995266_960_720.jpg',
    'Instagram': 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png',
    'Twitter': 'https://cdn.pixabay.com/photo/2018/05/08/21/29/twitter-3384010_960_720.png',
    'Vimeo': 'https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834011_960_720.jpg'
  };

  return {
    id: randomId,
    url: url,
    title: randomTitle,
    description: 'This is a mock description for the video. In a real application, this would contain actual details about the video content.',
    thumbnailUrl: platformThumbnails[detectedPlatform],
    platform: detectedPlatform,
    author: 'Content Creator',
    duration: duration,
    viewCount: `${Math.floor(Math.random() * 1000000).toLocaleString()} views`,
    availableFormats: availableFormats
  };
};
