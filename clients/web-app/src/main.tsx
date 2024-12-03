// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import App from './App';

import { Provider } from './components/ui/provider';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
