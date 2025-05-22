import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import ExpenseForm from '../components/ExpenseForm';
import { Expense } from '../models/Expense';
import { saveExpense, getExpenses, getCurrentMonthBudget } from '../services/StorageService';
import { 
  sendExpenseAddedNotification, 
  sendBudgetExceededNotification,
  sendBudgetWarningNotification 
} from '../services/NotificationService';
import { calculateTotalExpenses, getCurrentMonth, getExpensesForMonth } from '../utils/helpers';
import { APP_SETTINGS } from '../utils/constants';
import { debugLog } from '../utils/debug';

type ExpenseEntryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExpenseEntry'>;
  route: RouteProp<RootStackParamList, 'ExpenseEntry'>;
};

const ExpenseEntryScreen: React.FC<ExpenseEntryScreenProps> = ({ navigation, route }) => {
  const { category } = route.params;
  const [isSaving, setIsSaving] = useState(false);
  const handleSaveExpense = async (expense: Expense) => {
    if (isSaving) return; // Prevent multiple submissions
    
    setIsSaving(true);
    
    try {
      debugLog('Saving expense:', expense);
      
      // Save the expense to storage
      await saveExpense(expense);
      debugLog('Expense saved successfully');
      
      try {
        // Send notification for expense added
        await sendExpenseAddedNotification(expense);
        debugLog('Expense notification sent');
      } catch (notificationError) {
        // Don't let notification errors prevent saving the expense
        debugLog('Error sending expense notification:', notificationError);
      }
      
      // Check budget status
      try {
        const allExpenses = await getExpenses();
        debugLog('Retrieved all expenses:', allExpenses);
        
        const currentMonth = getCurrentMonth();
        const currentMonthExpenses = getExpensesForMonth(allExpenses, currentMonth);
        debugLog('Current month expenses:', currentMonthExpenses);
        
        const totalSpent = calculateTotalExpenses(currentMonthExpenses);
        debugLog('Total spent this month:', totalSpent);
        
        // Get current month's budget
        const budget = await getCurrentMonthBudget();
        debugLog('Current budget:', budget);
        
        if (budget) {
          const budgetPercentage = (totalSpent / budget.limit) * 100;
          debugLog('Budget percentage used:', budgetPercentage);
          
          // If budget exceeded, send notification
          if (totalSpent > budget.limit) {
            await sendBudgetExceededNotification(totalSpent, budget);
            debugLog('Budget exceeded notification sent');
          } 
          // If approaching budget limit (warning threshold), send warning
          else if (budgetPercentage >= APP_SETTINGS.budgetWarningThreshold && budgetPercentage < 100) {
            await sendBudgetWarningNotification(totalSpent, budget, Math.round(budgetPercentage));
            debugLog('Budget warning notification sent');
          }
        } else {
          debugLog('No budget set, skipping budget checks');
        }
      } catch (budgetError) {
        // Don't let budget check errors prevent saving the expense
        debugLog('Error checking budget:', budgetError);
      }
        // Navigate back to dashboard
      Alert.alert(
        'Success',
        'Expense saved successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
      );
      
    } catch (error) {
      debugLog('Error saving expense:', error);
      
      // Provide more user-friendly error message
      let errorMessage = 'Failed to save expense. Please try again.';
      
      // If it's a specific type of error, provide more details
      if (error instanceof Error) {
        if (error.message.includes('AsyncStorage')) {
          errorMessage = 'Storage error. Please check your device storage and try again.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ExpenseForm category={category} onSave={handleSaveExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default ExpenseEntryScreen;
