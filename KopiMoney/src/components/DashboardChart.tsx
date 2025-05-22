import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Expense, Budget } from '../models/Expense';
import { calculateBudgetUsedPercentage, formatAmount } from '../utils/helpers';

interface DashboardChartProps {
  expenses: Expense[];
  budget: Budget | null;
  chartData: any[];
  totalSpent: number;
}

const screenWidth = Dimensions.get('window').width;

const DashboardChart: React.FC<DashboardChartProps> = ({
  expenses,
  budget,
  chartData,
  totalSpent,
}) => {
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const budgetUsedPercentage = calculateBudgetUsedPercentage(totalSpent, budget);

  return (
    <View style={styles.container}>
      <View style={styles.budgetSummaryContainer}>
        <Text style={styles.totalSpentText}>
          {formatAmount(totalSpent)}
          {budget && (
            <Text style={styles.budgetText}> / {formatAmount(budget.limit)}</Text>
          )}
        </Text>
        <Text style={styles.monthText}>{budget?.month || 'this month'}</Text>

        {budget && (
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(budgetUsedPercentage, 100)}%`,
                  backgroundColor: budgetUsedPercentage > 100 ? '#FF6347' : '#4682B4',
                },
              ]}
            />
          </View>
        )}

        <Text style={styles.percentageText}>{budgetUsedPercentage}% used</Text>
      </View>

      {chartData.length > 0 ? (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Spending by Category</Text>
          <PieChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No expenses recorded yet</Text>
        </View>
      )}

      <View style={styles.recentExpensesList}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {expenses.length > 0 ? (
          <FlatList
            data={expenses.slice(0, 5)} // Show only 5 most recent expenses
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.expenseItem}>
                <View style={styles.expenseDetails}>
                  <Text style={styles.expenseCategory}>{item.category}</Text>
                  <Text style={styles.expenseDate}>{item.date}</Text>
                </View>
                <Text style={styles.expenseAmount}>{formatAmount(item.amount)}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noExpensesText}>No recent expenses</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  budgetSummaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  totalSpentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  budgetText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#666',
  },
  monthText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginVertical: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  noDataContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 32,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
  recentExpensesList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  expenseDetails: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '500',
  },
  expenseDate: {
    fontSize: 14,
    color: '#666',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noExpensesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default DashboardChart;
