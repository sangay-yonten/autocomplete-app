import { useDebounce } from './debounce';
import { renderHook, act } from '@testing-library/react';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('debounces function calls', async () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunc, 500));

    const [debouncedFunc] = result.current;

    act(() => {
      debouncedFunc('test');
    });

    expect(mockFunc).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFunc).toHaveBeenCalledWith('test', expect.any(AbortSignal));
  });

  it('aborts previous calls on new invocation', () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunc, 500));

    const [debouncedFunc] = result.current;

    act(() => {
      debouncedFunc('first');
      debouncedFunc('second');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith('second', expect.any(AbortSignal));
  });
});
