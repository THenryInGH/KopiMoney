import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import { Expense, Budget } from '../models/Expense';
import { getExpenses, getCurrentMonthBudget } from '../services/StorageService';
import {
  calculateTotalExpenses,
  getExpensesForMonth,
  getCurrentMonth,
  calculateExpensesByCategory,
  generatePieChartData
} from '../utils/helpers';
import { debugLog, dumpAsyncStorage, initializeTestData } from '../utils/debug';
import DashboardChart from '../components/DashboardChart';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Function to load dashboard data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      debugLog('Loading dashboard data...');
      
      // Dump AsyncStorage contents to help diagnose issues
      await dumpAsyncStorage();
      
      const allExpenses = await getExpenses();
      debugLog('All expenses:', allExpenses);
      const currentBudget = await getCurrentMonthBudget();
      debugLog('Current budget:', currentBudget);
      const currentMonth = getCurrentMonth();
      debugLog('Current month:', currentMonth);
      const monthExpenses = getExpensesForMonth(allExpenses, currentMonth);
      debugLog('Month expenses:', monthExpenses);
      const monthTotal = calculateTotalExpenses(monthExpenses);
      debugLog('Month total:', monthTotal);
      
      // Sort expenses by date (newest first)
      const sortedExpenses = monthExpenses.length > 0 
        ? [...monthExpenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : [];
      
      // Get expenses by category
      const expensesByCategory = calculateExpensesByCategory(monthExpenses);
      debugLog('Expenses by category:', expensesByCategory);
      
      // Generate chart data
      const pieChartData = generatePieChartData(expensesByCategory);
      debugLog('Chart data:', pieChartData);
      
      setExpenses(allExpenses);
      setCurrentMonthExpenses(sortedExpenses);
      setBudget(currentBudget);
      setTotalSpent(monthTotal);
      setChartData(pieChartData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [loadDashboardData])
  );

  // Handle add expense button press
  const handleAddExpense = () => {
    navigation.navigate('ExpenseType');
  };
  
  // Handle budget settings button press
  const handleBudgetSettings = () => {
    navigation.navigate('BudgetSettings');
  };
    // Handle notifications button press
  const handleNotifications = () => {
    navigation.navigate('NotificationHistory');
  };
  
  // Handle debug button press
  const handleDebugPress = async () => {
    Alert.alert(
      'Debug Options',
      'Select an option:',
      [
        { 
          text: 'Initialize Test Data', 
          onPress: async () => {
            await initializeTestData();
            Alert.alert('Test Data Initialized', 'Sample expenses and budget have been created.');
            loadDashboardData();
          } 
        },
        { 
          text: 'Dump AsyncStorage', 
          onPress: async () => {
            await dumpAsyncStorage();
            Alert.alert('AsyncStorage Dumped', 'Check the console logs for details.');
          } 
        },
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading dashboard data...</Text>
        </View>
      ) : (
        <DashboardChart
          expenses={currentMonthExpenses}
          budget={budget}
          chartData={chartData}
          totalSpent={totalSpent}
        />
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addExpenseButton}
          onPress={handleAddExpense}
        >
          <Text style={styles.buttonText}>ADD EXPENSE</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={loadDashboardData}
        >
          <Text style={styles.navButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleBudgetSettings}
        >
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNotifications}
        >
          <Text style={styles.navButtonText}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleDebugPress}
        >
          <Text style={styles.navButtonText}>Debug</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  addExpenseButton: {
    backgroundColor: '#4682B4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  navButtonText: {
    fontSize: 14,
    color: '#4682B4',
  },
});

export default DashboardScreen;
