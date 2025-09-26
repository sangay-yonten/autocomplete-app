// Autocomplete input component
import React, { useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchInputState, isDropdownOpenState, isLoadingState, autocompleteOptionsState } from '../../atoms';
import { filteredOptionsSelector } from '../../selectors';
import { fetchUsers } from '../../services/api';
import { Item } from '../../types';
import './Autocomplete.css';

const Autocomplete: React.FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(isDropdownOpenState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
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

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    setIsDropdownOpen(value.length > 0);
  }, [setSearchInput, setIsDropdownOpen]);

  const handleOptionClick = useCallback((option: Item) => {
    // This will be handled by the provider
    console.log('Selected option:', option);
    setIsDropdownOpen(false);
  }, [setIsDropdownOpen]);

  const handleInputFocus = useCallback(() => {
    if (searchInput.trim()) {
      setIsDropdownOpen(true);
    }
  }, [searchInput, setIsDropdownOpen]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding dropdown to allow option clicks
    setTimeout(() => setIsDropdownOpen(false), 150);
  }, [setIsDropdownOpen]);

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="autocomplete-input"
        placeholder={isLoading ? "Loading..." : "Search for items..."}
        value={searchInput}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={isLoading}
      />

      {isDropdownOpen && (
        <div className="autocomplete-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="autocomplete-option"
                onClick={() => handleOptionClick(option)}
              >
                {option.title}
              </div>
            ))
          ) : searchInput.trim() ? (
            <div className="autocomplete-option no-results">
              No results found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
