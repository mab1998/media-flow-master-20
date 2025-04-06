
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { DownloadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  // Simple validation schema
  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          const path = err.path[0].toString();
          if (path === 'email' || path === 'password') {
            formattedErrors[path] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 bg-card rounded-xl border border-border/50 shadow-xl">
        <div className="flex flex-col items-center justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <DownloadCloud className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Omni<span className="text-primary">Video</span></span>
          </Link>
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to log in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Log In'
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              For demo, use: <span className="font-semibold">user@example.com</span> / <span className="font-semibold">password</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
