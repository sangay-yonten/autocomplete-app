import { fetchUsers } from './api';

// Mock fetch globally
global.fetch = jest.fn();

describe('fetchUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and filters users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    const mockController = new AbortController();

    const result = await fetchUsers('John', mockController.signal);

    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', expect.any(Object));
    expect(result).toEqual([
      {
        id: 1,
        title: 'John Doe',
        completed: false,
        email: 'john@example.com',
      },
    ]);
  });

  it('handles API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchUsers()).rejects.toThrow('HTTP error! status: 500');
  });

  it('aborts request with AbortSignal', async () => {
    const abortController = new AbortController();
    abortController.abort();

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Aborted'));

    await expect(fetchUsers('', abortController.signal)).rejects.toThrow('Aborted');
  });
});
