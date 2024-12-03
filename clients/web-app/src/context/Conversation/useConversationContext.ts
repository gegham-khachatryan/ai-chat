import { useContext } from 'react';
import ConversationContext from './ConversationContext';

function useConversationContext() {
  const context = useContext(ConversationContext);
  if (context === null) {
    throw new Error('useConversationContext must be used within ConversationProvider');
  }
  return context;
}

export default useConversationContext;
