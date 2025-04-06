
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StyleConfigSidebar } from '@/components/admin/style/StyleConfigSidebar';
import { ColorSchemeConfig } from '@/components/admin/style/ColorSchemeConfig';
import { SocialMediaConfig as SocialMediaConfigComponent } from '@/components/admin/style/SocialMediaConfig';
import { LandingSectionsConfig } from '@/components/admin/style/LandingSectionsConfig';
import { FaqConfig } from '@/components/admin/style/FaqConfig';
import { SiteConfig } from '@/types/api';
import { api } from '@/api/mockApi';
import { useApiRequest } from '@/api/mockApi';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

const AdminStyleConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const { data: siteConfig, isLoading, refetch } = useApiRequest<SiteConfig>(
    'getSiteConfig',
    () => api.getSiteConfig()
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg font-medium">Loading configuration...</span>
        </div>
      </AdminLayout>
    );
  }

  if (!siteConfig) {
    return (
      <AdminLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-medium text-destructive">Failed to load configuration</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        <StyleConfigSidebar activeItem={activeTab} onItemSelect={setActiveTab} />
        
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Style Configuration</h1>
          <p className="text-muted-foreground">
            Configure the appearance and content of your website.
          </p>
          
          <Separator />
          
          {activeTab === 'general' && (
            <Card>
              <CardContent className="pt-6">
                <ColorSchemeConfig 
                  colorScheme={siteConfig.colorScheme} 
                  onUpdate={refetch}
                />
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'social' && (
            <Card>
              <CardContent className="pt-6">
                <SocialMediaConfigComponent 
                  socialMedia={siteConfig.socialMedia} 
                  onUpdate={refetch}
                />
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'landing' && (
            <Card>
              <CardContent className="pt-6">
                <LandingSectionsConfig 
                  sections={siteConfig.landingSections} 
                  onUpdate={refetch}
                />
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'faq' && (
            <Card>
              <CardContent className="pt-6">
                <FaqConfig 
                  faqItems={siteConfig.faqItems} 
                  onUpdate={refetch}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStyleConfigPage;
