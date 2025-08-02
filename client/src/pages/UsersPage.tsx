import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { api } from '../services/api';
import type { UserResponse } from '../../../shared/types/user';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadUsers = async () => {
    setIsLoading(true);
    setAlert(null);

    try {
      const usersData = await api.getUsers();
      setUsers(usersData);
      setHasLoaded(true);
      setAlert({
        type: 'success',
        message: `Loaded ${usersData.length} users successfully!`
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to load users'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 className="text-center mb-4">Users</h1>
          
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleLoadUsers}
              variant="primary"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load Users'}
            </Button>

            {hasLoaded && users.length > 0 && (
              <div className="mt-4">
                <h2 className="mb-4">Registered Users:</h2>
                <div className="flex flex-col gap-3">
                  {users.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="font-medium text-lg">{user.fullName}</div>
                      <div className="text-gray-600">{user.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasLoaded && users.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No users found.
              </div>
            )}

            <Button
              onClick={() => navigate('/register')}
              variant="secondary"
            >
              Back to Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 