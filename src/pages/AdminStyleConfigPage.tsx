
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ColorSchemeConfig } from '@/components/admin/style/ColorSchemeConfig';
import { FaqConfig } from '@/components/admin/style/FaqConfig';
import { LandingSectionsConfig } from '@/components/admin/style/LandingSectionsConfig';
import { SocialMediaConfig } from '@/components/admin/style/SocialMediaConfig';
import { api } from '@/api/mockApi';
import { useToast } from '@/hooks/use-toast';

const AdminStyleConfigPage = () => {
  const [siteConfig, setSiteConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSiteConfig = async () => {
    try {
      setIsLoading(true);
      const response = await api.getSiteConfig();
      setSiteConfig(response.data);
    } catch (error) {
      console.error('Error fetching site configuration:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load site configuration. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Style Configuration</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading configuration...</span>
        </div>
      ) : !siteConfig ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p>Failed to load configuration. Please refresh the page.</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="colors">
          <TabsList className="mb-6">
            <TabsTrigger value="colors">Color Scheme</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="landing">Landing Sections</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors">
            <Card>
              <CardContent className="pt-6">
                <ColorSchemeConfig 
                  colorScheme={siteConfig.colorScheme} 
                  onUpdate={fetchSiteConfig}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faqs">
            <Card>
              <CardContent className="pt-6">
                <FaqConfig 
                  faqItems={siteConfig.faqItems} 
                  onUpdate={fetchSiteConfig}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="landing">
            <Card>
              <CardContent className="pt-6">
                <LandingSectionsConfig 
                  sections={siteConfig.landingSections} 
                  onUpdate={fetchSiteConfig}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social">
            <Card>
              <CardContent className="pt-6">
                <SocialMediaConfig 
                  socialMedia={siteConfig.socialMedia} 
                  onUpdate={fetchSiteConfig}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </AdminLayout>
  );
};

export default AdminStyleConfigPage;
