
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { type VideoInfo } from '@/types/api';
import { api, useApiRequest } from '@/api/mockApi';

type VideoUrlInputProps = {
  onVideoFetched: (videoInfo: VideoInfo) => void;
};

export const VideoUrlInput: React.FC<VideoUrlInputProps> = ({ onVideoFetched }) => {
  const [url, setUrl] = useState('');
  
  const { execute: fetchVideo, isLoading } = useApiRequest(api.fetchVideoInfo, {
    onSuccess: (data) => {
      onVideoFetched(data);
      // Store URL for later use
      localStorage.setItem(`video_${data.id}_url`, url);
    },
    errorMessage: 'Failed to fetch video information. Please check the URL and try again.'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    const videoInfo = await fetchVideo(url);
    if (videoInfo) {
      // Input is kept if fetch fails
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative flex w-full max-w-3xl mx-auto">
        <Input
          type="url"
          placeholder="Paste video URL from YouTube, TikTok, Facebook, Instagram..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full pr-24 border-r-0 rounded-r-none h-12 text-base"
          disabled={isLoading}
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading || !url.trim()} 
          className="rounded-l-none h-12 px-6"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Get Video'
          )}
        </Button>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Supports YouTube, TikTok, Facebook, Instagram, Twitter, Vimeo, and more
      </div>
    </form>
  );
};
