// Type definitions for the application

export interface Item {
  id: number;
  title: string;
  completed?: boolean;
  email?: string;
}

export interface SelectedItem extends Item {
  selectedAt: Date;
}

export interface AutocompleteContextType {
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
