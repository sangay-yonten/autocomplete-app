// Recoil selectors for derived state
import { selector } from 'recoil';
import { searchInputState, autocompleteOptionsState, selectedItemsState } from '../atoms';
import { Item } from '../types';

// Selector for filtered autocomplete options based on search input
export const filteredOptionsSelector = selector<Item[]>({
  key: 'filteredOptionsSelector',
  get: ({ get }) => {
    const searchInput = get(searchInputState);
    const options = get(autocompleteOptionsState);
    const selectedItems = get(selectedItemsState);

    if (!searchInput.trim()) {
      return [];
    }

    // Filter options based on search input and exclude already selected items
    const selectedIds = new Set(selectedItems.map(item => item.id));

    return options.filter(option =>
      !selectedIds.has(option.id) &&
      option.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  },
});

// Selector for selected items count
export const selectedItemsCountSelector = selector<number>({
  key: 'selectedItemsCountSelector',
  get: ({ get }) => {
    const selectedItems = get(selectedItemsState);
    return selectedItems.length;
  },
});
