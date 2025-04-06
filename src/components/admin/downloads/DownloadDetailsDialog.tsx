
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { type DownloadRecord } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type DownloadDetailsDialogProps = {
  downloadId: string;
};

export const DownloadDetailsDialog: React.FC<DownloadDetailsDialogProps> = ({ downloadId }) => {
  const [open, setOpen] = useState(false);
  
  // For a real API, this would fetch the specific download by ID
  // For our mock, we'll just grab the download from the mockDownloads array
  const { execute: fetchDownload, isLoading, data: download } = useApiRequest<DownloadRecord, [string]>(
    (id) => {
      // Mock implementation to simulate API call
      return api.getDownloadById(id);
    },
    {
      errorMessage: 'Failed to load download details',
    }
  );
  
  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchDownload(downloadId);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="View download details">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View download details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Download Details</DialogTitle>
          <DialogDescription>
            Detailed information about this download.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6 text-center">Loading download details...</div>
        ) : !download ? (
          <div className="py-6 text-center text-destructive">Download record not found</div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <div className="font-medium text-muted-foreground">Download ID:</div>
              <div className="font-mono text-xs">{download.id}</div>
              
              <div className="font-medium text-muted-foreground">User:</div>
              <div>{download.userName}</div>
              
              <div className="font-medium text-muted-foreground">Video Title:</div>
              <div>{download.videoTitle}</div>
              
              <div className="font-medium text-muted-foreground">Platform:</div>
              <div>{download.platform}</div>
              
              <div className="font-medium text-muted-foreground">Quality:</div>
              <div>{download.quality}</div>
              
              <div className="font-medium text-muted-foreground">File Size:</div>
              <div>{download.fileSize}</div>
              
              <div className="font-medium text-muted-foreground">Status:</div>
              <div>
                <Badge variant={download.status === 'completed' ? 'default' : 'destructive'}>
                  {download.status}
                </Badge>
              </div>
              
              <div className="font-medium text-muted-foreground">Download Date:</div>
              <div>{format(new Date(download.downloadDate), 'MMM d, yyyy HH:mm')}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
