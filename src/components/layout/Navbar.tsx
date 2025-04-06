
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DownloadCloud,
  Menu,
  X,
  LogIn,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/40 backdrop-blur-sm">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <DownloadCloud className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Omni<span className="text-primary">Video</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name || 'Account'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-foreground py-2 hover:text-primary" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/features" className="text-foreground py-2 hover:text-primary" onClick={closeMenu}>
              Features
            </Link>
            <Link to="/pricing" className="text-foreground py-2 hover:text-primary" onClick={closeMenu}>
              Pricing
            </Link>
            <Link to="/faq" className="text-foreground py-2 hover:text-primary" onClick={closeMenu}>
              FAQ
            </Link>
            <div className="border-t border-border/50 my-2"></div>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-foreground py-2 hover:text-primary" 
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <button 
                  className="flex items-center text-destructive py-2" 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center text-foreground py-2 hover:text-primary" 
                  onClick={closeMenu}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Button className="mt-2" onClick={() => {
                  navigate('/signup');
                  closeMenu();
                }}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
