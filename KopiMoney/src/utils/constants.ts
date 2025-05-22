// This file contains default settings for the app
import { Budget } from '../models/Expense';
import { getCurrentMonth } from '../utils/helpers';

// Default categories (already defined in models/Expense.ts)
// This is just for reference

// Default budget for current month
export const DEFAULT_BUDGET: Budget = {
  limit: 1000.00,  // RM 1000 default budget
  month: getCurrentMonth(),
};

// Default app settings
export const APP_SETTINGS = {
  currency: 'RM',  // Malaysian Ringgit
  budgetWarningThreshold: 80,  // Show warning when 80% of budget is used
  maxRecentExpenses: 5,  // Number of recent expenses to show on dashboard
};

// Default chart colors (already defined in models/Expense.ts)
// This is just for reference
