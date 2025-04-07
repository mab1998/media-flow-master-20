
import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/api/mockApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { PaymentSession } from '@/types/api';

// Helper function to get URL parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const sessionId = query.get('session_id');
  const planId = query.get('plan_id');
  
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setError("No payment session provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.getPaymentSession(sessionId);
        if (response.success) {
          setPaymentSession(response.data);
        } else {
          setError("Failed to retrieve payment details");
        }
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl py-16 px-4">
        <Card className="w-full">
          {isLoading ? (
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg">Processing your payment...</p>
            </CardContent>
          ) : error ? (
            <CardContent className="flex flex-col items-center py-10">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Error</h2>
              <p className="text-center text-muted-foreground">{error}</p>
              <Button className="mt-6" onClick={() => navigate('/pricing')}>
                Return to Pricing
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="w-full flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl">Payment Successful!</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Thank you for your purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-card/50">
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-muted-foreground">Amount:</p>
                    <p className="font-medium text-right">
                      ${(paymentSession?.amount || 0) / 100} {paymentSession?.currency?.toUpperCase()}
                    </p>
                    
                    <p className="text-muted-foreground">Date:</p>
                    <p className="font-medium text-right">
                      {paymentSession ? new Date(paymentSession.createdAt).toLocaleDateString() : '-'}
                    </p>
                    
                    <p className="text-muted-foreground">Payment method:</p>
                    <p className="font-medium text-right capitalize">
                      {paymentSession?.paymentMethod || '-'}
                    </p>
                    
                    <p className="text-muted-foreground">Transaction ID:</p>
                    <p className="font-medium text-right font-mono text-sm">
                      {paymentSession?.id || '-'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-medium mb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                    Your account has been upgraded
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You now have access to all premium features. Start exploring your new capabilities right away.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleGoToDashboard}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
