import { Platform } from 'react-native';

// Polyfill for crypto.getRandomValues() when using uuid in React Native with Hermes engine
export const polyfillCrypto = () => {
  // Only apply the polyfill if it's not already available
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    // @ts-ignore
    global.crypto = {
      getRandomValues: (arr: Uint8Array) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
        return arr;
      }
    };
  }
};

// Generate a UUID without depending on crypto.getRandomValues()
export const generateUUID = (): string => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
