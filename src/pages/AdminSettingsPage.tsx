
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const AdminSettingsPage: React.FC = () => {
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been saved successfully."
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification settings have been saved successfully."
    });
  };

  const handleSaveAPISettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your API settings have been saved successfully."
    });
  };

  const handleSaveSmtpSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your SMTP settings have been saved successfully."
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="OmniVideo" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input id="site-description" defaultValue="Video downloader for multiple platforms" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Features</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable the site for maintenance
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-signup-notification">User Signup Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify admins when new users sign up
                    </p>
                  </div>
                  <Switch id="user-signup-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-notification">Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for subscription payments
                    </p>
                  </div>
                  <Switch id="payment-notification" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="email-sender">Sender Email</Label>
                  <Input id="email-sender" type="email" defaultValue="no-reply@omnivideo.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-sender-name">Sender Name</Label>
                  <Input id="email-sender-name" defaultValue="OmniVideo" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure API access and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-api">Enable API</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow API access to the system
                    </p>
                  </div>
                  <Switch id="enable-api" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input id="api-key" type="password" value="•••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="rate-limiting">Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit API requests per minute
                    </p>
                  </div>
                  <Switch id="rate-limiting" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rate-limit-value">Rate Limit</Label>
                  <Input id="rate-limit-value" type="number" defaultValue="60" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveAPISettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Settings</CardTitle>
              <CardDescription>Configure email sending server settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smtp-enabled">Enable SMTP</Label>
                    <p className="text-sm text-muted-foreground">
                      Use custom SMTP server for sending emails
                    </p>
                  </div>
                  <Switch id="smtp-enabled" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue="smtp.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Encryption</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-encryption">
                      <SelectValue placeholder="Select encryption type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" defaultValue="smtp-user@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <div className="flex space-x-2">
                    <Input id="smtp-password" type="password" value="•••••••••••••••" />
                    <Button variant="outline" size="icon">
                      👁️
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="mr-2">Test Connection</Button>
                  <Button variant="outline">Send Test Email</Button>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveSmtpSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
