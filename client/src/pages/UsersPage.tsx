import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { api } from '../services/api';
import type { UserResponse } from '../../../shared/types';

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
                <h2 className="mb-4 text-center">Registered Users:</h2>
                <div className="flex justify-center">
                  <div className="overflow-x-auto shadow-lg border-2 border-gray-300 rounded-lg">
                    <table className="border-collapse border border-gray-300 rounded-lg overflow-hidden bg-white">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-gray-700 min-w-[200px]">
                            Name
                          </th>
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-gray-700 min-w-[250px]">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="border border-gray-300 px-6 py-4 text-gray-800">
                              {user.fullName}
                            </td>
                            <td className="border border-gray-300 px-6 py-4 text-gray-600">
                              {user.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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