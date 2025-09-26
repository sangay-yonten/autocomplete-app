// Main provider component that wraps the application
import React, { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component
 * This component wraps the application with all necessary providers
 * Currently, RecoilRoot is added at the index.tsx level
 * This component is ready for additional providers if needed in step 7
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      {/* Additional providers can be added here in step 7 */}
      {children}
    </>
  );
};

export default AppProvider;
