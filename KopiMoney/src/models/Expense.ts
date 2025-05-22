// Expense data model interface as described in the system architecture
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string; // Optional description or note
}

// Budget interface for storing user's monthly budget limit
export interface Budget {
  limit: number;
  month: string; // Format: YYYY-MM
}

// Notification interface for storing notification history
export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
}

// Expense category types
export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Travel',
  'Other'
];

// Color map for expense categories (for charts)
export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#FF6384',
  Transportation: '#36A2EB',
  Housing: '#FFCE56',
  Utilities: '#4BC0C0',
  Entertainment: '#9966FF',
  Healthcare: '#FF9F40',
  Shopping: '#C9CBCF',
  Education: '#7CFC00',
  Travel: '#00BFFF',
  Other: '#808080'
};
