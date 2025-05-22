// Debug utility functions for KopiMoney app
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Log to console with timestamp
export const debugLog = (message: string, data?: any): void => {
  const timestamp = new Date().toISOString();
  if (data) {
    console.log(`[${timestamp}] ${message}`, data);
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
};

// Show alert with debug information
export const debugAlert = (title: string, message: string): void => {
  Alert.alert(title, message);
};

// Dump AsyncStorage contents for debugging
export const dumpAsyncStorage = async (): Promise<void> => {
  try {
    debugLog('Dumping AsyncStorage contents:');
    
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    debugLog('AsyncStorage keys:', keys);
    
    // Get all items
    const items = await AsyncStorage.multiGet(keys);
    
    // Log each item
    items.forEach(([key, value]) => {
      debugLog(`Key: ${key}`, value ? JSON.parse(value) : null);
    });
    
    return;
  } catch (error) {
    debugLog('Error dumping AsyncStorage:', error);
  }
};

// Reset AsyncStorage (for testing)
export const resetAsyncStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    debugLog('AsyncStorage has been cleared');
  } catch (error) {
    debugLog('Error clearing AsyncStorage:', error);
  }
};

// Initialize test data (for testing/demo purposes)
export const initializeTestData = async (): Promise<void> => {
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  // Sample expenses
  const testExpenses = [
    {
      id: 'test-id-1',
      amount: 25.50,
      category: 'Food',
      date: currentDate.toISOString().split('T')[0],
      note: 'Lunch at restaurant'
    },
    {
      id: 'test-id-2',
      amount: 35.00,
      category: 'Transportation',
      date: currentDate.toISOString().split('T')[0],
      note: 'Uber ride'
    },
    {
      id: 'test-id-3',
      amount: 120.00,
      category: 'Shopping',
      date: currentDate.toISOString().split('T')[0],
      note: 'New shirt'
    }
  ];
  
  // Sample budget
  const testBudget = {
    limit: 1000.00,
    month: currentMonth
  };
  
  // Save test data
  try {
    await AsyncStorage.setItem('kopi_money_expenses', JSON.stringify(testExpenses));
    await AsyncStorage.setItem('kopi_money_budget', JSON.stringify([testBudget]));
    
    debugLog('Test data initialized successfully');
  } catch (error) {
    debugLog('Error initializing test data:', error);
  }
};
