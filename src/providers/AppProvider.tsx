// Main provider component that wraps the application
import React, { ReactNode, createContext, useContext, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  searchInputState,
  selectedItemsState,
  isLoadingState,
  isDropdownOpenState,
  autocompleteOptionsState,
  errorMessageState,
} from '../atoms';
import { filteredOptionsSelector } from '../selectors';
import { fetchUsers } from '../services/api';
import { useDebounce } from '../utils/debounce';
import { AutocompleteContextType, Item, SelectedItem } from '../types';

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
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const errorMessage = useRecoilValue(errorMessageState);
  const filteredOptions = useRecoilValue(filteredOptionsSelector);

  // Debounced API fetch function
  const [debouncedFetch] = useDebounce(async (query: string, signal: AbortSignal) => {
    if (query.trim().length > 2) {
      setIsLoading(true);
      try {
        const data = await fetchUsers(query.trim(), signal);
        setAutocompleteOptions(data);
        setErrorMessage(null); // Clear error on success
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setAutocompleteOptions([]);
        setErrorMessage('Failed to load users. Please try again.');
        setIsDropdownOpen(false); // Close dropdown on error
      } finally {
        setIsLoading(false);
      }
    } else {
      setAutocompleteOptions([]);
    }
  }, 500);

  // Fetch initial data on component mount - REMOVED to trigger on input

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setIsDropdownOpen(value.length > 0);
    setErrorMessage(null); // Clear error on new input
    debouncedFetch(value);
  }, [setSearchInput, setIsDropdownOpen, setErrorMessage, debouncedFetch]);

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

  // Handle re-editing a selected item by moving it back to input
  const handleReEditItem = useCallback((item: SelectedItem) => {
    handleRemoveItem(item.id);
    handleSearchChange(item.title);
    setTimeout(() => handleInputFocus(), 0); // Delay to allow state update
  }, [handleRemoveItem, handleSearchChange, handleInputFocus]);

  const contextValue: AutocompleteContextType = {
    // State
    searchInput,
    selectedItems,
    isLoading,
    isDropdownOpen,
    filteredOptions,
    errorMessage,

    // Actions
    handleSearchChange,
    handleSelectItem,
    handleRemoveItem,
    handleReEditItem,
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
