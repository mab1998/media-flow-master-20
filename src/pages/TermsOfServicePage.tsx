
import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { api } from '@/api/mockApi';
import { Skeleton } from '@/components/ui/skeleton';
import Markdown from 'react-markdown';
import { Loader2 } from 'lucide-react';
import { LegalDocument } from '@/types/api';

const TermsOfServicePage: React.FC = () => {
  const [terms, setTerms] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        const response = await api.getTermsOfService();
        if (response.success) {
          setTerms(response.data);
        }
      } catch (error) {
        console.error("Failed to load terms of service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <MainLayout>
      <div className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : terms ? (
          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{terms.content}</Markdown>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p>Failed to load terms of service. Please try again later.</p>
          </div>
        )}
        
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Last updated: {terms ? new Date(terms.lastUpdated).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfServicePage;
