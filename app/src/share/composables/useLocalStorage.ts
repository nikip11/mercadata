export interface ResponseUseLocalStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
  clear: () => void;
}

export default function useLocalStorage(): ResponseUseLocalStorage {
  const setItem = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  const clear = (): void => {
    localStorage.clear();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
}
