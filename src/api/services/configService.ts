
import { SiteConfig, SocialMediaConfig, LandingPageSection, FAQItem, ColorScheme } from '@/types/api';
import { faqItems } from '../data/faqItems';

// Mock site configuration data
const mockColorScheme: ColorScheme = {
  id: '1',
  name: 'Default Theme',
  primaryColor: '#8B5CF6',
  secondaryColor: '#1A1F2C',
  accentColor: '#1EAEDB',
  backgroundColor: '#1A1F2C',
  textColor: '#FFFFFF',
  isDarkMode: true,
};

const mockSocialMedia: SocialMediaConfig[] = [
  {
    id: '1',
    platform: 'Facebook',
    url: 'https://facebook.com/omnivideo',
    isActive: true,
    icon: 'Facebook',
  },
  {
    id: '2',
    platform: 'Instagram',
    url: 'https://instagram.com/omnivideo',
    isActive: true,
    icon: 'Instagram',
  },
  {
    id: '3',
    platform: 'Twitter',
    url: 'https://twitter.com/omnivideo',
    isActive: true,
    icon: 'Twitter',
  },
  {
    id: '4',
    platform: 'YouTube',
    url: 'https://youtube.com/omnivideo',
    isActive: false,
    icon: 'Youtube',
  },
  {
    id: '5',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/omnivideo',
    isActive: false,
    icon: 'Linkedin',
  },
];

const mockLandingSections: LandingPageSection[] = [
  {
    id: '1',
    title: 'Download Videos From Any Platform',
    subtitle: 'Fast, Easy, and Secure',
    content: 'OmniVideo allows you to download videos from popular platforms like YouTube, TikTok, Instagram, and more. Get started right away with no software to install.',
    order: 1,
    isActive: true,
    imageUrl: '/placeholder.svg',
    buttonText: 'Try Now',
    buttonUrl: '#download',
  },
  {
    id: '2',
    title: 'Multiple Quality Options',
    subtitle: 'From SD to 4K',
    content: 'Choose the perfect quality for your needs. Our platform supports downloads from 240p all the way up to 4K resolutions, depending on the source video.',
    order: 2,
    isActive: true,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Subscription Plans for Every Need',
    content: 'Whether you\'re a casual user or a power downloader, we have plans to suit your needs. Free users can get started immediately, while premium plans unlock advanced features.',
    order: 3,
    isActive: true,
    buttonText: 'See Plans',
    buttonUrl: '/pricing',
  },
  {
    id: '4',
    title: 'Company Values',
    subtitle: 'Our Mission',
    content: 'We believe in providing easy access to online content while respecting copyright laws. Our mission is to build tools that empower users to save content for personal use.',
    order: 4,
    isActive: false,
  },
];

const mockSiteConfig: SiteConfig = {
  id: '1',
  siteName: 'OmniVideo',
  siteDescription: 'Download videos from any platform',
  logoUrl: '/placeholder.svg',
  faviconUrl: '/favicon.ico',
  colorScheme: mockColorScheme,
  socialMedia: mockSocialMedia,
  landingSections: mockLandingSections,
  faqItems: faqItems,
  lastUpdated: new Date().toISOString(),
};

// Config service for the admin interface
export const configService = {
  // Get the full site configuration
  getSiteConfig: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockSiteConfig, success: true };
  },

  // Update site configuration
  updateSiteConfig: async (config: Partial<SiteConfig>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedConfig = { ...mockSiteConfig, ...config, lastUpdated: new Date().toISOString() };
    return { data: updatedConfig, success: true, message: 'Site configuration updated successfully' };
  },

  // Update social media settings
  updateSocialMedia: async (socialMedia: SocialMediaConfig[]) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedConfig = { ...mockSiteConfig, socialMedia, lastUpdated: new Date().toISOString() };
    return { data: updatedConfig, success: true, message: 'Social media settings updated successfully' };
  },

  // Update landing page sections
  updateLandingSections: async (sections: LandingPageSection[]) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const updatedConfig = { 
      ...mockSiteConfig, 
      landingSections: sections.sort((a, b) => a.order - b.order),
      lastUpdated: new Date().toISOString()
    };
    return { data: updatedConfig, success: true, message: 'Landing page sections updated successfully' };
  },

  // Update FAQ items
  updateFAQs: async (items: FAQItem[]) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedConfig = { ...mockSiteConfig, faqItems: items, lastUpdated: new Date().toISOString() };
    return { data: updatedConfig, success: true, message: 'FAQ items updated successfully' };
  },

  // Update color scheme
  updateColorScheme: async (colorScheme: ColorScheme) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const updatedConfig = { ...mockSiteConfig, colorScheme, lastUpdated: new Date().toISOString() };
    return { data: updatedConfig, success: true, message: 'Color scheme updated successfully' };
  },
};
