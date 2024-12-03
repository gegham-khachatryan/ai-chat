import { PropsWithChildren, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { setDefaultHeader } from '../../api';
import { Spinner } from '@chakra-ui/react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));

  useEffect(() => {
    if (token) {
      setDefaultHeader('Authorization', `Bearer ${token}`);
    } else {
      setDefaultHeader('Authorization', null);
    }
    setLoading(false);
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    setDefaultHeader('Authorization', `Bearer ${token}`);
    localStorage.setItem('auth_token', token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout
      }}
    >
      {!loading ? children : <Spinner position='absolute' inset='0' m='auto' />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
