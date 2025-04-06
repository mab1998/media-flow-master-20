
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  DownloadCloud,
  LayoutDashboard,
  CreditCard,
  FileText,
  PuzzleIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: DownloadCloud, label: 'Downloads', path: '/admin/downloads' },
    { icon: PuzzleIcon, label: 'Plans', path: '/admin/plans' },
    { icon: FileText, label: 'Invoices', path: '/admin/invoices' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-border/50 bg-card flex flex-col h-screen">
      <div className="p-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <DownloadCloud className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">OmniVideo Admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors",
                  location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
