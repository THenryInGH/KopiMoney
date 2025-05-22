import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { EXPENSE_CATEGORIES, CATEGORY_COLORS } from '../models/Expense';

interface CategoryButtonProps {
  category: string;
  onPress: (category: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onPress }) => {
  const backgroundColor = CATEGORY_COLORS[category] || '#CCCCCC';
  
  return (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor }]}
      onPress={() => onPress(category)}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
};

interface ExpenseTypeSelectorProps {
  onSelectCategory: (category: string) => void;
}

const ExpenseTypeSelector: React.FC<ExpenseTypeSelectorProps> = ({ onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an expense category</Text>
      <View style={styles.categoryGrid}>
        {EXPENSE_CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onPress={onSelectCategory}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '45%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExpenseTypeSelector;
