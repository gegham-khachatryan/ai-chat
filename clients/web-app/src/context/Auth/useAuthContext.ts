import { useContext } from 'react';
import AuthContext from './AuthContext';

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

export default useAuthContext;
