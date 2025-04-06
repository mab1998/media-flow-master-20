
import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserInfo } from '@/components/dashboard/UserInfo';
import { DownloadHistory } from '@/components/dashboard/DownloadHistory';
import { VideoUrlInput } from '@/components/video/VideoUrlInput';
import { VideoCard } from '@/components/video/VideoCard';
import { type VideoInfo } from '@/types/api';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const { user } = useAuth();

  const handleVideoFetched = (info: VideoInfo) => {
    setVideoInfo(info);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="gradient-text">{user?.name || 'User'}</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Download videos and manage your account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border border-border/50 p-6">
            <h2 className="text-xl font-semibold mb-4">Download Videos</h2>
            <VideoUrlInput onVideoFetched={handleVideoFetched} />

            {videoInfo && (
              <div className="mt-6">
                <VideoCard videoInfo={videoInfo} />
              </div>
            )}
          </div>

          <DownloadHistory />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <UserInfo />
          
          <div className="bg-card rounded-lg border border-border/50 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
                  1
                </span>
                <p>Paste any video URL from supported platforms to start downloading.</p>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
                  2
                </span>
                <p>Select your preferred format and quality before downloading.</p>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
                  3
                </span>
                <p>Your download history is saved automatically and shown below.</p>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2">
                  4
                </span>
                <p>Upgrade your plan to access higher quality downloads and more features.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
