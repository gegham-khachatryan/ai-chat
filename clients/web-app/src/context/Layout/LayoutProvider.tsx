import { PropsWithChildren, useState } from 'react';
import LayoutContext from './LayoutContext';

const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [sidebarOpened, setSetSidebarOpened] = useState(false);

  const toggleSidebar = () => {
    setSetSidebarOpened((prev) => !prev);
  };
  const closeSidebar = () => {
    setSetSidebarOpened(false);
  };

  return <LayoutContext.Provider value={{ sidebarOpened, toggleSidebar, closeSidebar }}>{children}</LayoutContext.Provider>;
};

export default LayoutProvider;
