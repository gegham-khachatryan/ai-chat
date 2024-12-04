import { createContext } from 'react';

interface ILayoutContext {
  sidebarOpened: boolean;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<ILayoutContext | null>(null);

export default LayoutContext;
