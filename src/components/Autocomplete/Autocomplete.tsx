// Autocomplete input component
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchInputState, isDropdownOpenState } from '../../atoms';
import { filteredOptionsSelector } from '../../selectors';
import './Autocomplete.css';

const Autocomplete: React.FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(isDropdownOpenState);
  const filteredOptions = useRecoilValue(filteredOptionsSelector);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    // Dropdown logic will be added later
  };

  const handleInputFocus = () => {
    // Focus logic will be added later
  };

  const handleInputBlur = () => {
    // Blur logic will be added later
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="autocomplete-input"
        placeholder="Search for items..."
        value={searchInput}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {/* Dropdown container - will be populated with options later */}
      <div className="autocomplete-dropdown">
        {/* Options will be rendered here */}
      </div>
    </div>
  );
};

export default Autocomplete;
