
import { type Platform, type VideoInfo, type VideoQuality } from "@/types/api";

// Platform-specific mock thumbnails
const platformThumbnails: Record<Platform, string> = {
  'YouTube': 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  'TikTok': 'https://i.pinimg.com/originals/c9/6b/6e/c96b6e549899b7155e86d31b3c3b747c.jpg',
  'Facebook': 'https://cdn.pixabay.com/photo/2021/02/08/15/38/social-media-5995266_960_720.jpg',
  'Instagram': 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png',
  'Twitter': 'https://cdn.pixabay.com/photo/2018/05/08/21/29/twitter-3384010_960_720.png',
  'Vimeo': 'https://cdn.pixabay.com/photo/2016/11/18/11/16/social-1834011_960_720.jpg'
};

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
    { id: `fmt1-${randomId}`, label: '240p', quality: '240p' as VideoQuality, format: 'MP4', fileSize: '10 MB' },
    { id: `fmt2-${randomId}`, label: '360p', quality: '360p' as VideoQuality, format: 'MP4', fileSize: '20 MB' },
    { id: `fmt3-${randomId}`, label: '480p', quality: '480p' as VideoQuality, format: 'MP4', fileSize: '40 MB' },
    { id: `fmt4-${randomId}`, label: '720p', quality: '720p' as VideoQuality, format: 'MP4', fileSize: '80 MB' },
    { id: `fmt5-${randomId}`, label: '1080p', quality: '1080p' as VideoQuality, format: 'MP4', fileSize: '160 MB' },
    { id: `fmt6-${randomId}`, label: '2K', quality: '2K' as VideoQuality, format: 'MP4', fileSize: '300 MB' },
    { id: `fmt7-${randomId}`, label: '4K', quality: '4K' as VideoQuality, format: 'MP4', fileSize: '600 MB' },
    { id: `fmt8-${randomId}`, label: 'MP3 Audio', quality: '240p' as VideoQuality, format: 'MP3', fileSize: '5 MB' }
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
