// API service for fetching data from JSONPlaceholder
import { Item } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch todos from JSONPlaceholder API
 * @param query - Optional search query to filter results
 * @returns Promise with array of items
 */
export const fetchTodos = async (query?: string): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Item[] = await response.json();
    
    // If query is provided, filter the results
    if (query && query.trim()) {
      return data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results for better performance
    }
    
    // Return first 10 items if no query
    return data.slice(0, 10);
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

/**
 * Fetch users from JSONPlaceholder API (alternative data source)
 * @param query - Optional search query to filter results
 * @param signal - Optional AbortSignal to cancel the request
 * @returns Promise with array of items formatted from users
 */
export const fetchUsers = async (query?: string, signal?: AbortSignal): Promise<Item[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, { signal });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform users to match Item interface
    let users: Item[] = data.map((user: any) => ({
      id: user.id,
      title: user.name,
      completed: false,
      email: user.email
    }));

    // If query is provided, filter the results
    if (query && query.trim()) {
      users = users.filter(user =>
        user.title.toLowerCase().includes(query.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
