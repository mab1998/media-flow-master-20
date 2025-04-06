
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
import { type User } from '@/types/api';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

type UserDetailsDialogProps = {
  userId: string;
};

export const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  
  const { execute: fetchUser, isLoading, data: user } = useApiRequest<User, [string]>(
    api.getUserById,
    {
      errorMessage: 'Failed to load user details',
    }
  );
  
  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchUser(userId);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="View user details">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View user details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about this user account.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6 text-center">Loading user details...</div>
        ) : !user ? (
          <div className="py-6 text-center text-destructive">User not found</div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="font-medium text-muted-foreground">Name:</div>
              <div>{user.name}</div>
              
              <div className="font-medium text-muted-foreground">Email:</div>
              <div>{user.email}</div>
              
              <div className="font-medium text-muted-foreground">User ID:</div>
              <div className="font-mono text-xs">{user.id}</div>
              
              <div className="font-medium text-muted-foreground">Plan:</div>
              <div>
                <Badge variant={user.plan === 'Free' ? 'secondary' : 'default'}>
                  {user.plan}
                </Badge>
              </div>
              
              <div className="font-medium text-muted-foreground">Downloads:</div>
              <div>{user.downloadCount}</div>
              
              <div className="font-medium text-muted-foreground">Registered:</div>
              <div>{format(new Date(user.registrationDate), 'MMM d, yyyy')}</div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Recent Downloads</h4>
              {user.downloads && user.downloads.length > 0 ? (
                <div className="border rounded-md divide-y">
                  {user.downloads.slice(0, 3).map((download, idx) => (
                    <div key={idx} className="p-2 text-sm">
                      <div className="font-medium">{download.videoInfo.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(download.downloadDate), 'MMM d, yyyy')} • 
                        {download.format.quality} • 
                        {download.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No downloads yet</div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
