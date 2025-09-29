import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Autocomplete from './Autocomplete';
import { useDebounce } from '../../utils/debounce';

// Mock the debounce hook
jest.mock('../../utils/debounce');
const mockUseDebounce = useDebounce as jest.Mock;

// Mock the context hook
jest.mock('../../providers/AppProvider');

const mockUseAutocompleteContext = require('../../providers/AppProvider').useAutocompleteContext;

describe('Autocomplete', () => {
  beforeEach(() => {
    mockUseDebounce.mockReturnValue([jest.fn(), jest.fn()]);
  });

  it('displays error message when present', () => {
    mockUseAutocompleteContext.mockReturnValue({
      searchInput: '',
      selectedItems: [],
      isLoading: false,
      isDropdownOpen: false,
      filteredOptions: [],
      errorMessage: 'Test error',
      handleSearchChange: jest.fn(),
      handleSelectItem: jest.fn(),
      handleRemoveItem: jest.fn(),
      handleReEditItem: jest.fn(),
      handleInputFocus: jest.fn(),
      handleInputBlur: jest.fn(),
    });

    render(
      <RecoilRoot>
        <Autocomplete />
      </RecoilRoot>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls handleSearchChange on input change', () => {
    const mockHandleSearchChange = jest.fn();

    mockUseAutocompleteContext.mockReturnValue({
      searchInput: '',
      selectedItems: [],
      isLoading: false,
      isDropdownOpen: false,
      filteredOptions: [],
      errorMessage: null,
      handleSearchChange: mockHandleSearchChange,
      handleSelectItem: jest.fn(),
      handleRemoveItem: jest.fn(),
      handleReEditItem: jest.fn(),
      handleInputFocus: jest.fn(),
      handleInputBlur: jest.fn(),
    });

    render(
      <RecoilRoot>
        <Autocomplete />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(/search for users/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockHandleSearchChange).toHaveBeenCalledWith('test');
  });
});
