'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);

      if (result.success) {
        router.push('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Sign up to start managing your finances</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
