import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Budget, Notification } from '../models/Expense';

// Keys for AsyncStorage
const EXPENSES_KEY = 'kopi_money_expenses';
const BUDGET_KEY = 'kopi_money_budget';
const NOTIFICATIONS_KEY = 'kopi_money_notifications';

// Expense storage service
export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    // Get existing expenses
    const existingExpensesJSON = await AsyncStorage.getItem(EXPENSES_KEY);
    let expenses: Expense[] = [];
    
    if (existingExpensesJSON) {
      expenses = JSON.parse(existingExpensesJSON);
    }
    
    // Add new expense
    expenses.push(expense);
    
    // Save updated expenses
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesJSON = await AsyncStorage.getItem(EXPENSES_KEY);
    return expensesJSON ? JSON.parse(expensesJSON) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

// Budget storage service
export const saveBudget = async (budget: Budget): Promise<void> => {
  try {
    // Get existing budgets
    const existingBudgetsJSON = await AsyncStorage.getItem(BUDGET_KEY);
    let budgets: Budget[] = [];
    
    if (existingBudgetsJSON) {
      budgets = JSON.parse(existingBudgetsJSON);
    }
    
    // Check if budget for this month already exists
    const existingBudgetIndex = budgets.findIndex(b => b.month === budget.month);
    
    if (existingBudgetIndex !== -1) {
      // Update existing budget
      budgets[existingBudgetIndex] = budget;
    } else {
      // Add new budget
      budgets.push(budget);
    }
    
    // Save updated budgets
    await AsyncStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budget:', error);
    throw error;
  }
};

export const getCurrentMonthBudget = async (): Promise<Budget | null> => {
  try {
    const budgetsJSON = await AsyncStorage.getItem(BUDGET_KEY);
    
    if (!budgetsJSON) {
      return null;
    }
    
    const budgets: Budget[] = JSON.parse(budgetsJSON);
    
    // Get current month in YYYY-MM format
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    // Find budget for current month
    const currentBudget = budgets.find(b => b.month === currentMonth);
    
    return currentBudget || null;
  } catch (error) {
    console.error('Error getting current month budget:', error);
    return null;
  }
};

// Notification storage service
export const saveNotification = async (notification: Notification): Promise<void> => {
  try {
    // Get existing notifications
    const existingNotificationsJSON = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    let notifications: Notification[] = [];
    
    if (existingNotificationsJSON) {
      notifications = JSON.parse(existingNotificationsJSON);
    }
    
    // Add new notification
    notifications.push(notification);
    
    // Save updated notifications
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notification:', error);
    throw error;
  }
};

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const notificationsJSON = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    return notificationsJSON ? JSON.parse(notificationsJSON) : [];
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const notificationsJSON = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    
    if (!notificationsJSON) {
      return;
    }
    
    const notifications: Notification[] = JSON.parse(notificationsJSON);
    
    // Find and update the notification
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    // Save updated notifications
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Utility function to clear all data (for testing/reset)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([EXPENSES_KEY, BUDGET_KEY, NOTIFICATIONS_KEY]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
