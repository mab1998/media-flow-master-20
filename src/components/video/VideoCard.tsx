
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Download, Loader2 } from 'lucide-react';
import { type VideoInfo, type VideoFormat } from '@/types/api';
import { api, useApiRequest } from '@/api/mockApi';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type VideoCardProps = {
  videoInfo: VideoInfo;
};

export const VideoCard: React.FC<VideoCardProps> = ({ videoInfo }) => {
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(
    videoInfo.availableFormats.length > 0 ? videoInfo.availableFormats[0] : null
  );

  const { execute: downloadVideo, isLoading } = useApiRequest(
    api.downloadVideo,
    {
      successMessage: 'Download started successfully!',
    }
  );

  const handleDownload = async () => {
    if (!selectedFormat) return;
    
    const downloadResult = await downloadVideo(videoInfo.id, selectedFormat.id);
    if (downloadResult) {
      console.log('Download successful:', downloadResult);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border/50 overflow-hidden w-full max-w-3xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden md:col-span-1">
          <img
            src={videoInfo.thumbnailUrl}
            alt={videoInfo.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-black/70 text-white">{videoInfo.platform}</Badge>
        </div>

        {/* Video Info */}
        <div className="p-4 md:col-span-2">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{videoInfo.title}</h3>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-4">
            <span className="text-muted-foreground">{videoInfo.duration}</span>
            <span className="text-muted-foreground">{videoInfo.viewCount}</span>
            <span className="text-muted-foreground">By: {videoInfo.author}</span>
          </div>

          {/* Format Selection */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Select Format:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {videoInfo.availableFormats.map((format) => (
                <Button
                  key={format.id}
                  variant={selectedFormat?.id === format.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-auto py-1.5 justify-start",
                    selectedFormat?.id === format.id && "border-primary"
                  )}
                  onClick={() => setSelectedFormat(format)}
                >
                  {selectedFormat?.id === format.id && (
                    <Check className="mr-1 h-3.5 w-3.5 text-current" />
                  )}
                  <span>{format.quality} {format.format}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedFormat && `Size: ${selectedFormat.fileSize}`}
            </div>
            <Button
              onClick={handleDownload}
              disabled={!selectedFormat || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
