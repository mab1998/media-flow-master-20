
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Mock function to check if user is admin (in a real app, this would check roles)
  const isAdmin = () => {
    // For mock purposes, let's say user with ID '1' is an admin
    return user?.id === '1' || user?.email === 'user@example.com';
  };

  useEffect(() => {
    if (!isLoading) {
      // Redirect if not authenticated
      if (!isAuthenticated) {
        navigate('/login');
      }
      // Redirect if authenticated but not admin
      else if (!isAdmin()) {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin()) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 bg-card p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
