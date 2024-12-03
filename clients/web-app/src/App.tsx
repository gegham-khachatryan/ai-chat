import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Conversations from './pages/Conversation';
import NewConversation from './pages/NewConversation';
import { Layout, ConversationsLayout } from './components/layout';

import { useAuthContext } from './context/Auth';

const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Layout>
      <Routes>
        {/* <Route path='/some-public-route' element={<SomePublicPage />} />  */}
        {/* <Route path='/some-public-route-2' element={<SomePublicPage2 />} />  */}
        <Route path='/*' element={isAuthenticated ? <ProtectedRoutes /> : <AuthRoutes />} />
      </Routes>
    </Layout>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route element={<ConversationsLayout />}>
        <Route path='/new' element={<NewConversation />} />
        <Route path='/conversation/:conversationId' element={<Conversations />} />
        <Route path='*' element={<Navigate to='/new' />} />
      </Route>
    </Routes>
  );
};

export default App;
