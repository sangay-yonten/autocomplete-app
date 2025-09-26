// Main provider component that wraps the application
import React, { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default AppProvider;
