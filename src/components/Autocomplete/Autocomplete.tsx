// Autocomplete input component
import React, { useCallback } from 'react';
import { useAutocompleteContext } from '../../providers/AppProvider';
import { Item } from '../../types';
import './Autocomplete.css';

const Autocomplete: React.FC = () => {
  const {
    searchInput,
    isLoading,
    isDropdownOpen,
    filteredOptions,
    errorMessage,
    handleSearchChange,
    handleSelectItem,
    handleInputFocus,
    handleInputBlur,
  } = useAutocompleteContext();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleSearchChange(value);
  }, [handleSearchChange]);

  const handleOptionClick = useCallback((option: Item) => {
    handleSelectItem(option);
  }, [handleSelectItem]);

  return (
    <div>
      <div className="autocomplete-container">
        <input
          type="text"
          className="autocomplete-input"
          placeholder={isLoading ? "Loading..." : "Search for users..."}
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
                No users found
              </div>
            ) : null}
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="autocomplete-error">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
