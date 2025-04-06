
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { VideoUrlInput } from '@/components/video/VideoUrlInput';
import { VideoCard } from '@/components/video/VideoCard';
import { PlatformsList } from '@/components/platforms/PlatformsList';
import { type VideoInfo } from '@/types/api';
import { DownloadCloud, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const navigate = useNavigate();
  
  const handleVideoFetched = (info: VideoInfo) => {
    setVideoInfo(info);
  };

  return (
    <MainLayout>
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Download Videos from <span className="gradient-text">Any Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fast, secure, and high-quality video downloader for YouTube, TikTok, Facebook, and more.
            </p>
          </div>

          <div className="mb-16">
            <VideoUrlInput onVideoFetched={handleVideoFetched} />
          </div>

          {videoInfo && (
            <div className="mb-16">
              <VideoCard videoInfo={videoInfo} />
            </div>
          )}

          <PlatformsList />
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <DownloadCloud className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose OmniVideo?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              OmniVideo offers the best video downloading experience with multiple format options,
              high-quality downloads, and support for all major platforms.
            </p>
            <Button 
              className="gap-2" 
              size="lg"
              onClick={() => navigate('/features')}
            >
              Explore Features <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
