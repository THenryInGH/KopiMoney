import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Expense } from '../models/Expense';
import { generateUniqueId, getCurrentDate, getCategoryColor } from '../utils/helpers';

interface ExpenseFormProps {
  category: string;
  onSave: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ category, onSave }) => {
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(getCurrentDate());
  const [note, setNote] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');

  // Validate amount input
  const validateAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setAmountError('Please enter a valid amount');
      return false;
    }
    setAmountError('');
    return true;
  };

  // Handle amount change
  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setAmount(cleanValue);
    
    if (cleanValue) {
      validateAmount(cleanValue);
    } else {
      setAmountError('');
    }
  };

  // Handle save
  const handleSave = () => {
    if (!validateAmount(amount)) {
      return;
    }

    const newExpense: Expense = {
      id: generateUniqueId(),
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim(),
    };

    onSave(newExpense);
  };

  const categoryColor = getCategoryColor(category);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.categoryHeader, { backgroundColor: categoryColor }]}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount (RM)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="Enter amount"
            keyboardType="numeric"
            autoFocus
          />
          {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={[styles.input, styles.noteInput]}
            value={note}
            onChangeText={setNote}
            placeholder="Add a note"
            multiline
          />
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            (!amount || amountError) ? styles.saveButtonDisabled : {}
          ]}
          onPress={handleSave}
          disabled={!amount || !!amountError}
        >
          <Text style={styles.saveButtonText}>ADD EXPENSE</Text>
        </TouchableOpacity>
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
  categoryHeader: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#4682B4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseForm;
