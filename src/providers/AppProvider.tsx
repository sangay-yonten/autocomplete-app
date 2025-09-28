// Main provider component that wraps the application
import React, { ReactNode, createContext, useContext, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  searchInputState,
  selectedItemsState,
  isLoadingState,
  isDropdownOpenState,
  autocompleteOptionsState,
} from '../atoms';
import { filteredOptionsSelector } from '../selectors';
import { fetchUsers } from '../services/api';
import { Item, SelectedItem } from '../types';

interface AutocompleteContextType {
  // State
  searchInput: string;
  selectedItems: SelectedItem[];
  isLoading: boolean;
  isDropdownOpen: boolean;
  filteredOptions: Item[];

  // Actions
  handleSearchChange: (value: string) => void;
  handleSelectItem: (item: Item) => void;
  handleRemoveItem: (itemId: number) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
}

const AutocompleteContext = createContext<AutocompleteContextType | undefined>(undefined);

export const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error('useAutocompleteContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component - Data Layer
 * Centralizes all autocomplete state and business logic
 * Provides autocomplete functionality through React Context
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(isDropdownOpenState);
  const setAutocompleteOptions = useSetRecoilState(autocompleteOptionsState);
  const filteredOptions = useRecoilValue(filteredOptionsSelector);

  // Fetch initial data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers();
        setAutocompleteOptions(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [setIsLoading, setAutocompleteOptions]);

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setIsDropdownOpen(value.length > 0);
  }, [setSearchInput, setIsDropdownOpen]);

  // Handle selecting an item
  const handleSelectItem = useCallback((item: Item) => {
    const newSelectedItem: SelectedItem = {
      ...item,
      selectedAt: new Date(),
    };

    setSelectedItems(prev => [...prev, newSelectedItem]);
    setSearchInput('');
    setIsDropdownOpen(false);
  }, [setSelectedItems, setSearchInput, setIsDropdownOpen]);

  // Handle removing a selected item
  const handleRemoveItem = useCallback((itemId: number) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  }, [setSelectedItems]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    if (searchInput.trim()) {
      setIsDropdownOpen(true);
    }
  }, [searchInput, setIsDropdownOpen]);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  }, [setIsDropdownOpen]);

  const contextValue: AutocompleteContextType = {
    // State
    searchInput,
    selectedItems,
    isLoading,
    isDropdownOpen,
    filteredOptions,

    // Actions
    handleSearchChange,
    handleSelectItem,
    handleRemoveItem,
    handleInputFocus,
    handleInputBlur,
  };

  return (
    <AutocompleteContext.Provider value={contextValue}>
      {children}
    </AutocompleteContext.Provider>
  );
};

export default AppProvider;
