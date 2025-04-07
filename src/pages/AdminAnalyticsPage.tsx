
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Loader2 } from 'lucide-react';
import { api } from '@/api/mockApi';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalDownloads: number;
  revenue: number;
  conversionRate: number;
  userSignupData: any;
  downloadsByPlatform: any;
  revenueData: any;
  conversionRateData: any;
  planDistribution: Record<string, number>;
}

const AdminAnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date() });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const { toast } = useToast();

  // Mock data for charts
  const userSignupData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users',
        data: [12, 19, 8, 15, 22, 30, 28],
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
      }
    ]
  };

  const downloadsByPlatform = {
    labels: ['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Facebook'],
    datasets: [
      {
        label: 'Downloads',
        data: [4230, 2840, 1950, 1200, 980],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 2100, 2400, 2800, 3200, 3800, 4200, 4500, 4800, 5100, 5400],
        borderColor: 'rgb(30, 174, 219)',
        backgroundColor: 'rgba(30, 174, 219, 0.1)',
        fill: true,
      }
    ]
  };

  const conversionRateData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [2.4, 2.8, 3.1, 2.9, 3.5, 4.2, 3.8],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      }
    ]
  };

  const planDistribution: Record<string, number> = {
    'Free': 65,
    'Basic': 20,
    'Premium': 10,
    'Enterprise': 5
  };

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would pass the timeRange or dateRange to the API
      const response = await new Promise<{success: boolean, data: AnalyticsData}>(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              totalUsers: 12458,
              activeUsers: 8342,
              totalDownloads: 145280,
              revenue: 28450,
              conversionRate: 3.2,
              userSignupData,
              downloadsByPlatform,
              revenueData,
              conversionRateData,
              planDistribution
            }
          });
        }, 1000);
      });
      
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load analytics data. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, dateRange]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    
    const now = new Date();
    let fromDate;
    
    switch (value) {
      case '24h':
        fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    setDateRange({ from: fromDate, to: now });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Monitor your platform's performance</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">or</span>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        <Button onClick={fetchAnalyticsData} variant="outline" size="sm">
          Refresh Data
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading analytics data...</span>
        </div>
      ) : !analyticsData ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p>Failed to load analytics data. Please refresh the page.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{Math.floor(Math.random() * 10) + 1}% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100) / 10}% conversion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalDownloads.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{Math.floor(Math.random() * 15) + 5}% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.revenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +{Math.floor(Math.random() * 10) + 2}% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Signups</CardTitle>
                    <CardDescription>New user registrations over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <BarChart data={analyticsData.userSignupData} height={300} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Downloads by Platform</CardTitle>
                    <CardDescription>Distribution of downloads across platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <PieChart data={analyticsData.downloadsByPlatform} height={300} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>Monthly revenue in USD</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <LineChart data={analyticsData.revenueData} height={300} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Distribution of users by plan</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <PieChart 
                      data={{
                        labels: Object.keys(analyticsData.planDistribution),
                        datasets: [{
                          label: 'Users',
                          data: Object.values(analyticsData.planDistribution),
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                          ],
                        }]
                      }} 
                      height={300} 
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>User acquisition and retention metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <LineChart 
                      data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                          {
                            label: 'New Users',
                            data: [120, 190, 210, 240, 280, 320, 380, 420, 450, 480, 510, 540],
                            borderColor: 'rgb(139, 92, 246)',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            fill: true,
                          },
                          {
                            label: 'Active Users',
                            data: [100, 160, 190, 210, 250, 290, 340, 390, 420, 450, 480, 510],
                            borderColor: 'rgb(34, 197, 94)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            fill: true,
                          }
                        ]
                      }}
                      height={400}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="downloads">
              <Card>
                <CardHeader>
                  <CardTitle>Download Analytics</CardTitle>
                  <CardDescription>Detailed download statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <BarChart 
                      data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                          {
                            label: 'YouTube',
                            data: [420, 390, 410, 430, 460, 480, 510, 530, 550, 580, 600, 620],
                            backgroundColor: 'rgba(255, 99, 132, 0.7)',
                          },
                          {
                            label: 'TikTok',
                            data: [320, 340, 360, 380, 390, 410, 430, 450, 470, 490, 510, 530],
                            backgroundColor: 'rgba(54, 162, 235, 0.7)',
                          },
                          {
                            label: 'Instagram',
                            data: [220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330],
                            backgroundColor: 'rgba(255, 206, 86, 0.7)',
                          }
                        ]
                      }}
                      height={400}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Financial performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <LineChart 
                      data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                          {
                            label: 'Revenue',
                            data: [1200, 1900, 2100, 2400, 2800, 3200, 3800, 4200, 4500, 4800, 5100, 5400],
                            borderColor: 'rgb(30, 174, 219)',
                            backgroundColor: 'rgba(30, 174, 219, 0.1)',
                            fill: true,
                          },
                          {
                            label: 'Expenses',
                            data: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            fill: true,
                          },
                          {
                            label: 'Profit',
                            data: [400, 1050, 1200, 1450, 1800, 2150, 2700, 3050, 3300, 3550, 3800, 4050],
                            borderColor: 'rgb(34, 197, 94)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            fill: true,
                          }
                        ]
                      }}
                      height={400}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
