import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { api } from '../services/api';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const registerSchema = useMemo(() => yup.object({
    fullName: yup.string().required('Full name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .matches(/^[^@]+@[^@]+\.[^@]+$/, 'Invalid email format')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/^05\d-\d{7}$/, 'Invalid phone number (05x-xxxxxxx)')
      .required('Phone is required'),
    password: yup
      .string()
      .matches(/[A-Z]/, 'Password must contain uppercase letter')
      .matches(/[a-z]/, 'Password must contain lowercase letter')
      .matches(/[0-9]/, 'Password must contain number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain special character')
      .required('Password is required'),
  }), []);

  type FormData = yup.InferType<typeof registerSchema>;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateField = async (field: keyof FormData, value: string) => {
    try {
      await registerSchema.validateAt(field, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }));
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (value) {
      validateField(field, value);
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
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
      await api.createUser(formData);
      setAlert({
        type: 'success',
        message: 'User registered successfully!'
      });
      // Clear form after successful registration
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 className="text-center mb-4">Register</h1>
          
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="form">
            <Input
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Enter your full name"
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="user@mail.com"
            />

            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              placeholder="05x-xxxxxxx"
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
                {isLoading ? 'Registering...' : 'Register'}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 