
import { type FAQItem } from "@/types/api";

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
