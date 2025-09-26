// Type definitions for the application

export interface Item {
  id: number;
  title: string;
  completed?: boolean;
}

export interface AutocompleteOption {
  id: number;
  label: string;
  value: string;
}

export interface SelectedItem extends Item {
  selectedAt: Date;
}
