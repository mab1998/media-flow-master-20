
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';

type DeleteUserDialogProps = {
  userId: string;
  userName: string;
  onSuccess: () => void;
};

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  userId,
  userName,
  onSuccess,
}) => {
  const [open, setOpen] = React.useState(false);

  const { execute: deleteUser, isLoading } = useApiRequest(
    api.deleteUser,
    {
      successMessage: `User "${userName}" deleted successfully`,
      errorMessage: 'Failed to delete user',
      onSuccess: () => {
        setOpen(false);
        onSuccess();
      },
    }
  );

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete user</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the user "{userName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
