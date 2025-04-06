
import { platforms } from '@/api/mockData';
import { Youtube, Facebook, Video, Music, Twitter, Image } from 'lucide-react';

export const PlatformsList = () => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return <Youtube className="h-6 w-6 text-red-500" />;
      case 'Facebook':
        return <Facebook className="h-6 w-6 text-blue-500" />;
      case 'TikTok':
        return <Music className="h-6 w-6 text-pink-500" />;
      case 'Instagram':
        return <Image className="h-6 w-6 text-purple-500" />;
      case 'Twitter':
        return <Twitter className="h-6 w-6 text-sky-500" />;
      case 'Vimeo':
        return <Video className="h-6 w-6 text-cyan-500" />;
      default:
        return <Video className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Supported Platforms</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {platforms.map((platform) => (
          <div
            key={platform}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all card-hover"
          >
            {getPlatformIcon(platform)}
            <span className="mt-2 text-sm font-medium">{platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
