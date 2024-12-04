import { useContext } from 'react';
import LayoutContext from './LayoutContext';

function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === null) {
    throw new Error('useLayoutContext must be used within LayoutProvider');
  }
  return context;
}

export default useLayoutContext;
