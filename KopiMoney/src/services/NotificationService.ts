import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Expense, Budget } from '../models/Expense';
import { saveNotification } from './StorageService';
import { generateUUID } from '../utils/uuidPolyfill';

// Configure notifications
export const configureNotifications = async (): Promise<void> => {
  // Request permissions
  await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  // Configure how the notifications appear
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

// Send a notification when an expense is added
export const sendExpenseAddedNotification = async (expense: Expense): Promise<void> => {
  const notificationContent = {
    title: 'Expense Added',
    body: `You spent RM ${expense.amount.toFixed(2)} on ${expense.category}`,
  };

  await sendNotification(notificationContent.title, notificationContent.body);
};

// Send a notification when budget is exceeded
export const sendBudgetExceededNotification = async (
  totalSpent: number,
  budget: Budget
): Promise<void> => {
  const notificationContent = {
    title: 'Budget Exceeded',
    body: `You have spent RM ${totalSpent.toFixed(2)}, which exceeds your budget of RM ${budget.limit.toFixed(2)}.`,
  };

  await sendNotification(notificationContent.title, notificationContent.body);
};

// Send a notification when approaching budget limit (e.g., 80%)
export const sendBudgetWarningNotification = async (
  totalSpent: number,
  budget: Budget,
  percentage: number
): Promise<void> => {
  const notificationContent = {
    title: 'Budget Warning',
    body: `You have spent RM ${totalSpent.toFixed(2)}, which is ${percentage}% of your monthly budget.`,
  };

  await sendNotification(notificationContent.title, notificationContent.body);
};

// Generic function to send a notification and save it to storage
const sendNotification = async (title: string, body: string): Promise<void> => {
  // First send the actual notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // Send immediately
  });
  // Then save it to storage for history
  const notification = {
    id: generateUUID(),
    title,
    body,
    date: new Date().toISOString(),
    read: false,
  };

  await saveNotification(notification);
};
