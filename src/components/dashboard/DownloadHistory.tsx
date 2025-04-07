
import { useState, useEffect } from 'react';
import { Video, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type UserDownload } from '@/types/api';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { useApi } from '@/api/mockApi';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const DownloadHistory = () => {
  const [filter, setFilter] = useState<{platform?: string, status?: string}>({});
  const [page] = useState(1);
  const [limit] = useState(20);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const api = useApi();

  const { execute: fetchDownloads, data, isLoading } = useApiRequest(
    () => api.getUserDownloads(page, limit, filter), 
    { 
      errorMessage: 'Failed to load download history',
      onError: (error) => {
        console.error('Download history error:', error);
        if (error.statusCode === 401) {
          toast({
            title: 'Authentication Required',
            description: 'Please log in to view your download history',
            variant: 'destructive',
          });
        }
      }
    }
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchDownloads();
    }
  }, [filter, page, isAuthenticated]);

  const downloads = data?.downloads || [];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get icon for platform
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
      case 'TikTok':
        return <svg className="h-4 w-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
      case 'Facebook':
        return <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
      case 'Instagram':
        return <svg className="h-4 w-4 text-purple-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>;
      case 'Twitter':
        return <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
      case 'Vimeo':
        return <svg className="h-4 w-4 text-cyan-500" viewBox="0 0 24 24" fill="currentColor"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const renderDownloadItem = (download: UserDownload) => (
    <div key={download.id} className="py-4">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-28 flex-shrink-0 overflow-hidden rounded-md">
          <img 
            src={download.videoInfo.thumbnailUrl} 
            alt={download.videoInfo.title}
            className="h-full w-full object-cover"
          />
          <Badge 
            className="absolute top-1 right-1 px-1 py-0.5 text-xs"
            variant="secondary"
          >
            {download.format.quality}
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{download.videoInfo.title}</p>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              {getPlatformIcon(download.videoInfo.platform)}
              <span className="ml-1">{download.videoInfo.platform}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(download.downloadDate)}</span>
            </div>
            
            <div className="flex items-center">
              {download.status === 'completed' 
                ? <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> 
                : <XCircle className="h-3 w-3 mr-1 text-red-500" />
              }
              <span className={download.status === 'completed' ? 'text-green-500' : 'text-red-500'}>
                {download.status.charAt(0).toUpperCase() + download.status.slice(1)}
              </span>
            </div>
          </div>
          
          <Badge variant="outline" className="mt-2 text-xs">
            {download.format.format} - {download.format.fileSize}
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border/50 p-6">
      <h2 className="text-xl font-semibold mb-4">Download History</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-auto sm:flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search downloads..."
            className="w-full pl-9"
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value || undefined }))}
          />
        </div>
        
        <div className="flex gap-4">
          <Select 
            onValueChange={(value) => setFilter(prev => ({ ...prev, platform: value || undefined }))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="YouTube">YouTube</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="Vimeo">Vimeo</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            onValueChange={(value) => setFilter(prev => ({ ...prev, status: value || undefined }))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {!isAuthenticated ? (
        <div className="py-8 text-center text-muted-foreground">
          <Video className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>Please log in to view your download history</p>
        </div>
      ) : isLoading ? (
        <div className="py-8 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading downloads...</p>
        </div>
      ) : downloads.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <Video className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>No downloads yet</p>
          <p className="text-sm mt-1">Your download history will appear here</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          {downloads.map((download, index) => (
            <div key={download.id}>
              {renderDownloadItem(download)}
              {index < downloads.length - 1 && <Separator />}
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};
