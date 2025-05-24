import { Platform } from 'react-native';

// Polyfill for crypto.getRandomValues() when using uuid in React Native with Hermes engine
export const polyfillCrypto = () => {
  // Only apply the polyfill if it's not already available
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    // @ts-ignore
    global.crypto = {
      getRandomValues: <T extends ArrayBufferView | null>(array: T): T => {
        if (array === null) {
          // Or handle as an error, depending on expected behavior for null input
          // For now, returning null to match the generic type if null is passed.
          // However, getRandomValues typically expects an ArrayBufferView.
          return null as T;
        }
        if (!(array instanceof Uint8Array)) {
          // This polyfill specifically handles Uint8Array.
          // A more robust polyfill might need to handle other ArrayBufferView types.
          console.warn('crypto.getRandomValues polyfill called with non-Uint8Array');
          // Depending on strictness, either throw an error or return array unmodified.
          // For now, returning as is, but this might not be cryptographically random.
          return array;
        }
        const arr = array as unknown as Uint8Array; // Cast to Uint8Array after checks
        for (let i = 0, l = arr.length; i < l; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
        return array;
      },
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
