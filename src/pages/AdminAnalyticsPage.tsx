
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/admin/StatCard';
import { DownloadsByPlatformChart } from '@/components/admin/DownloadsByPlatformChart';
import { DownloadsTrendChart } from '@/components/admin/DownloadsTrendChart';
import { api } from '@/api/mockApi';
import { Users, Download, ArrowUpCircle, Wallet } from 'lucide-react';

const AdminAnalyticsPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: api.getAdminStats,
  });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and performance data</p>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Loading analytics...</div>
      ) : isError ? (
        <div className="text-center py-4 text-destructive">Error loading analytics</div>
      ) : data ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard
              title="Total Users"
              value={data.totalUsers.toLocaleString()}
              icon={Users}
              trend={{
                value: 12,
                isPositive: true
              }}
            />
            <StatCard
              title="Active Users"
              value={data.activeUsers.toLocaleString()}
              icon={ArrowUpCircle}
              description={`${Math.round((data.activeUsers / data.totalUsers) * 100)}% of total users`}
            />
            <StatCard
              title="Premium Users"
              value={data.premiumUsers.toLocaleString()}
              icon={Wallet}
              description={`${Math.round((data.premiumUsers / data.totalUsers) * 100)}% of total users`}
              trend={{
                value: 8,
                isPositive: true
              }}
            />
            <StatCard
              title="Total Downloads"
              value={data.totalDownloads.toLocaleString()}
              icon={Download}
              trend={{
                value: 5,
                isPositive: true
              }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Downloads by Platform</CardTitle>
                <CardDescription>Distribution of downloads across different platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <DownloadsByPlatformChart data={Object.entries(data.downloadsByPlatform).map(([name, value]) => ({ name, value }))} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Downloads Trend</CardTitle>
                <CardDescription>Daily download trends for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <DownloadsTrendChart data={data.downloadsByDay} />
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
