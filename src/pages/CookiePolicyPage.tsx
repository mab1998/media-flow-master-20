
import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { api } from '@/api/mockApi';
import { Skeleton } from '@/components/ui/skeleton';
import Markdown from 'react-markdown';
import { LegalDocument } from '@/types/api';

const CookiePolicyPage: React.FC = () => {
  const [policy, setPolicy] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setIsLoading(true);
        const response = await api.getCookiePolicy();
        if (response.success) {
          setPolicy(response.data);
        }
      } catch (error) {
        console.error("Failed to load cookie policy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <MainLayout>
      <div className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : policy ? (
          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{policy.content}</Markdown>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p>Failed to load cookie policy. Please try again later.</p>
          </div>
        )}
        
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Last updated: {policy ? new Date(policy.lastUpdated).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CookiePolicyPage;
