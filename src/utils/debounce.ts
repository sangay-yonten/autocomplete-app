// Reusable debounce hook for React with AbortController support
import { useRef, useCallback } from 'react';

export function useDebounce(
  func: (query: string, signal: AbortSignal) => Promise<void>,
  delay: number
): [(query: string) => void, () => void] {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const abortCurrent = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const debouncedFunc = useCallback((query: string) => {
    abortCurrent();

    abortControllerRef.current = new AbortController();

    timeoutRef.current = setTimeout(async () => {
      try {
        await func(query, abortControllerRef.current!.signal);
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }, delay);
  }, [func, delay, abortCurrent]);

  return [debouncedFunc, abortCurrent];
}
