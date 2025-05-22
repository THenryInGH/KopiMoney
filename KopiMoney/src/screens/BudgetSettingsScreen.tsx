import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { Budget } from '../models/Expense';
import { saveBudget, getCurrentMonthBudget } from '../services/StorageService';
import { getCurrentMonth, formatAmount } from '../utils/helpers';
import { DEFAULT_BUDGET } from '../utils/constants';
import { debugLog } from '../utils/debug';

type BudgetSettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BudgetSettings'>;
};

const BudgetSettingsScreen: React.FC<BudgetSettingsScreenProps> = ({ navigation }) => {
  const [budgetLimit, setBudgetLimit] = useState<string>('');
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // Load current budget
  useEffect(() => {
    const loadCurrentBudget = async () => {
      try {
        debugLog('Loading current budget...');
        const budget = await getCurrentMonthBudget();
        
        if (budget) {
          debugLog('Found existing budget:', budget);
          setCurrentBudget(budget);
          setBudgetLimit(budget.limit.toString());
        } else {
          debugLog('No budget found, using defaults:', DEFAULT_BUDGET);
          setCurrentBudget(DEFAULT_BUDGET);
          setBudgetLimit(DEFAULT_BUDGET.limit.toString());
        }
      } catch (error) {
        debugLog('Error loading current budget:', error);
        // Use default budget in case of error
        setCurrentBudget(DEFAULT_BUDGET);
        setBudgetLimit(DEFAULT_BUDGET.limit.toString());
      }
    };

    loadCurrentBudget();
  }, []);

  // Handle budget limit change
  const handleBudgetLimitChange = (value: string) => {
    // Allow only numbers and decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setBudgetLimit(cleanValue);
  };

  // Handle save budget
  const handleSaveBudget = async () => {
    if (isSaving) return; // Prevent multiple submissions
    
    // Validate budget limit
    const numBudgetLimit = parseFloat(budgetLimit);
    if (isNaN(numBudgetLimit) || numBudgetLimit <= 0) {
      Alert.alert('Invalid Budget', 'Please enter a valid budget amount.');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Create budget object
      const newBudget: Budget = {
        limit: numBudgetLimit,
        month: currentMonth,
      };
      
      // Save budget
      await saveBudget(newBudget);
      
      Alert.alert(
        'Success',
        'Budget saved successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
      );
      
    } catch (error) {
      console.error('Error saving budget:', error);
      Alert.alert('Error', 'Failed to save budget. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.budgetContainer}>
          <Text style={styles.title}>Set Monthly Budget</Text>
          
          <Text style={styles.label}>
            Enter your budget limit for {currentMonth}
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>RM</Text>
            <TextInput
              style={styles.input}
              value={budgetLimit}
              onChangeText={handleBudgetLimitChange}
              placeholder="0.00"
              keyboardType="numeric"
              autoFocus
            />
          </View>
          
          {currentBudget && (
            <Text style={styles.currentBudget}>
              Current budget: {formatAmount(currentBudget.limit)}
            </Text>
          )}
          
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!budgetLimit || isSaving) ? styles.saveButtonDisabled : {}
            ]}
            onPress={handleSaveBudget}
            disabled={!budgetLimit || isSaving}
          >
            <Text style={styles.saveButtonText}>SAVE BUDGET</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Budget Tips</Text>
          <Text style={styles.infoText}>
            • Set a realistic budget that covers your essential expenses
          </Text>
          <Text style={styles.infoText}>
            • You'll receive a notification when you reach 80% of your budget
          </Text>
          <Text style={styles.infoText}>
            • Another notification will be sent if you exceed your budget limit
          </Text>
          <Text style={styles.infoText}>
            • Review your spending patterns and adjust your budget as needed
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  budgetContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4682B4',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  currentBudget: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#4682B4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4682B4',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
});

export default BudgetSettingsScreen;
