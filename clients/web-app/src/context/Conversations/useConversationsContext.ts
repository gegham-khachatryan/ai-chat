import { useContext } from 'react';
import ConversationsContext from './ConversationsContext';

function useConversationsContext() {
  const context = useContext(ConversationsContext);
  if (context === null) {
    throw new Error('useConversationsContext must be used within ConversationsProvider');
  }
  return context;
}

export default useConversationsContext;
