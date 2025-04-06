
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { DownloadsByPlatformChart } from '@/components/admin/DownloadsByPlatformChart';
import { DownloadsTrendChart } from '@/components/admin/DownloadsTrendChart';
import { api } from '@/api/mockApi';
import { Users, Download, UserCheck, Crown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => api.getAdminStats(),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-28 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </>
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={stats?.totalUsers.toLocaleString() || '0'}
                icon={Users}
                description="Total registered users"
                trend={{ value: 12, isPositive: true }}
              />
              <StatCard
                title="Total Downloads"
                value={stats?.totalDownloads.toLocaleString() || '0'}
                icon={Download}
                description="All time downloads"
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard
                title="Active Users"
                value={stats?.activeUsers.toLocaleString() || '0'}
                icon={UserCheck}
                description="Active in last 30 days"
                trend={{ value: 5, isPositive: true }}
              />
              <StatCard
                title="Premium Users"
                value={stats?.premiumUsers.toLocaleString() || '0'}
                icon={Crown}
                description="Pro and Unlimited plans"
                trend={{ value: 3, isPositive: false }}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <div className="p-4 rounded-lg border">
                <Skeleton className="h-5 w-40 mb-4" />
                <Skeleton className="h-80 w-full rounded-md" />
              </div>
              <div className="p-4 rounded-lg border lg:col-span-2">
                <Skeleton className="h-5 w-48 mb-4" />
                <Skeleton className="h-80 w-full rounded-md" />
              </div>
            </>
          ) : (
            <>
              <DownloadsByPlatformChart data={stats?.downloadsByPlatform || {}} />
              <DownloadsTrendChart data={stats?.downloadsByDay || []} />
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
