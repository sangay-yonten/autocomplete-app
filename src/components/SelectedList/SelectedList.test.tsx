import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import SelectedList from './SelectedList';

// Mock the context hook
jest.mock('../../providers/AppProvider');

const mockUseAutocompleteContext = require('../../providers/AppProvider').useAutocompleteContext;

describe('SelectedList', () => {
  it('renders selected items and handles re-edit on click', () => {
    const mockHandleReEditItem = jest.fn();
    const selectedItem = { id: 1, title: 'John Doe', completed: false, email: 'john@example.com', selectedAt: new Date() };

    mockUseAutocompleteContext.mockReturnValue({
      selectedItems: [selectedItem],
      handleRemoveItem: jest.fn(),
      handleReEditItem: mockHandleReEditItem,
    });

    render(
      <RecoilRoot>
        <SelectedList />
      </RecoilRoot>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    const item = screen.getByText('John Doe');
    fireEvent.click(item);

    expect(mockHandleReEditItem).toHaveBeenCalledWith(selectedItem);
  });

  it('shows no items message when empty', () => {
    mockUseAutocompleteContext.mockReturnValue({
      selectedItems: [],
      handleRemoveItem: jest.fn(),
      handleReEditItem: jest.fn(),
    });

    render(
      <RecoilRoot>
        <SelectedList />
      </RecoilRoot>
    );

    expect(screen.getByText('No users selected yet')).toBeInTheDocument();
  });
});
