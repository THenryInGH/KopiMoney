import { EXPENSE_CATEGORIES, CATEGORY_COLORS, Expense, Budget } from '../models/Expense';
import { generateUUID } from './uuidPolyfill';

// Get current date in YYYY-MM-DD format
export const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Get current month in YYYY-MM format
export const getCurrentMonth = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

// Format date from YYYY-MM-DD to DD/MM/YYYY for display
export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

// Get expenses for current month
export const getExpensesForMonth = (expenses: Expense[], month: string): Expense[] => {
  return expenses.filter((expense) => expense.date.startsWith(month));
};

// Calculate total expenses for a month
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

// Calculate expenses by category
export const calculateExpensesByCategory = (expenses: Expense[]): Record<string, number> => {
  return expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
};

// Generate chart data for pie chart
export const generatePieChartData = (expensesByCategory: Record<string, number>) => {
  return Object.keys(expensesByCategory).map((category) => {
    return {
      name: category,
      amount: expensesByCategory[category],
      color: CATEGORY_COLORS[category] || '#CCCCCC',
      legendFontColor: '#000000',
      legendFontSize: 12,
    };
  });
};

// Get color for category
export const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || '#CCCCCC';
};

// Generate unique ID for new items
export const generateUniqueId = (): string => {
  return generateUUID();
};

// Check if budget is exceeded
export const isBudgetExceeded = (totalSpent: number, budget: Budget | null): boolean => {
  if (!budget) return false;
  return totalSpent > budget.limit;
};

// Calculate percentage of budget used
export const calculateBudgetUsedPercentage = (
  totalSpent: number,
  budget: Budget | null
): number => {
  if (!budget || budget.limit === 0) return 0;
  return Math.round((totalSpent / budget.limit) * 100);
};

// Format amount with 2 decimal places and RM symbol
export const formatAmount = (amount: number): string => {
  return `RM ${amount.toFixed(2)}`;
};
