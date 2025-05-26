
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (token: string, user: any) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const isAdmin = email === 'admin@example.com' || email.includes('admin');
        const user = {
          id: '1',
          name: isAdmin ? 'Admin User' : 'John Doe',
          email: email,
          role: isAdmin ? 'admin' : 'user'
        };
        
        const token = 'mock-jwt-token';
        onLogin(token, user);
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });

        // Redirect based on role
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/193abd5d-557d-4e8f-bc3d-da6971485d5b.png" 
              alt="ArkTek Logo" 
              className="h-12 w-12"
            />
          </div>
          <CardTitle className="text-2xl text-center">Sign in to ArkTek</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-xs text-gray-600 mb-2">Demo credentials:</p>
            <p className="text-xs text-gray-600">User: user@example.com / password</p>
            <p className="text-xs text-gray-600">Admin: admin@example.com / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
