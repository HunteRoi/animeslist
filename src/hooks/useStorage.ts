import { useEffect, useState } from 'react';

// eslint-disable-next-line
export const useStorage = (key: string, defaultValue: any) => {
  const [itemKey] = useState(key);
  const [value, setValue] = useState(defaultValue);

  // eslint-disable-next-line
  const updateValue = (val: any) => {
    window.localStorage.setItem(itemKey, JSON.stringify(val));
    setValue(val);
  };

  useEffect(() => {
    const val = JSON.parse(window.localStorage.getItem(itemKey) ?? '{}');

    if (val !== null && val !== undefined) setValue(val);
  }, [itemKey]);

  return [value, updateValue] as const;
};
