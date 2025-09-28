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
