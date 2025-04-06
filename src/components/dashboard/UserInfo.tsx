
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get badge color based on plan
  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'Pro':
        return 'default';
      case 'Unlimited':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Account Information</h2>
        <Badge variant={getPlanBadgeVariant(user.plan)}>{user.plan} Plan</Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Member Since</p>
          <p className="font-medium">{formatDate(user.registrationDate)}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <p className="font-medium">{user.downloads.length}</p>
        </div>
      </div>
    </div>
  );
};
