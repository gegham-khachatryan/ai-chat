import { createContext } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
