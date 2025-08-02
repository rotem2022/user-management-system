import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { api } from '../services/api';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: Partial<FormData> = {};
        validationError.inner.forEach(error => {
          if (error.path) {
            newErrors[error.path as keyof FormData] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);
    setAlert(null);

    try {
      await api.login(formData);
      setAlert({
        type: 'success',
        message: 'Login successful! Redirecting to users page...'
      });
      
      // Redirect to users page after successful login
      setTimeout(() => {
        navigate('/users');
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Login failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 className="text-center mb-4">Login</h1>
          
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="form">
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
            />

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/register')}
              >
                Go to Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 