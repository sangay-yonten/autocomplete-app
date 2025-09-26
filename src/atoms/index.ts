// Recoil atoms for state management
import { atom } from 'recoil';
import { Item, SelectedItem } from '../types';

// Atom for search input value
export const searchInputState = atom<string>({
  key: 'searchInputState',
  default: '',
});

// Atom for autocomplete options fetched from API
export const autocompleteOptionsState = atom<Item[]>({
  key: 'autocompleteOptionsState',
  default: [],
});

// Atom for selected items
export const selectedItemsState = atom<SelectedItem[]>({
  key: 'selectedItemsState',
  default: [],
});

// Atom for loading state
export const isLoadingState = atom<boolean>({
  key: 'isLoadingState',
  default: false,
});

// Atom for dropdown visibility
export const isDropdownOpenState = atom<boolean>({
  key: 'isDropdownOpenState',
  default: false,
});
