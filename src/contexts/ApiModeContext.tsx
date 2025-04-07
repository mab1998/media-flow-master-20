
import React, { createContext, useContext, useState, useEffect } from 'react';

// API Mode type
type ApiMode = 'mock' | 'real';

// Context interface
interface ApiModeContextType {
  apiMode: ApiMode;
  setApiMode: (mode: ApiMode) => void;
  toggleApiMode: () => void;
}

// Create context with default value
const ApiModeContext = createContext<ApiModeContextType | undefined>(undefined);

// Provider props
interface ApiModeProviderProps {
  children: React.ReactNode;
}

// Provider component
export const ApiModeProvider: React.FC<ApiModeProviderProps> = ({ children }) => {
  // Initialize with value from localStorage or default to 'mock'
  const [apiMode, setApiModeSafe] = useState<ApiMode>(() => {
    const savedMode = localStorage.getItem('apiMode');
    return (savedMode === 'mock' || savedMode === 'real') ? savedMode : 'mock';
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('apiMode', apiMode);
  }, [apiMode]);

  // State setter
  const setApiMode = (mode: ApiMode) => {
    setApiModeSafe(mode);
  };

  // Toggle function
  const toggleApiMode = () => {
    setApiModeSafe(prevMode => (prevMode === 'mock' ? 'real' : 'mock'));
  };

  // Context value
  const value = {
    apiMode,
    setApiMode,
    toggleApiMode,
  };

  return (
    <ApiModeContext.Provider value={value}>
      {children}
    </ApiModeContext.Provider>
  );
};

// Custom hook for using the context
export const useApiMode = (): ApiModeContextType => {
  const context = useContext(ApiModeContext);
  if (context === undefined) {
    throw new Error('useApiMode must be used within an ApiModeProvider');
  }
  return context;
};
