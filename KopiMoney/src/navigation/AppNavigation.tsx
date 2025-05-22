import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ExpenseTypeScreen from '../screens/ExpenseTypeScreen';
import ExpenseEntryScreen from '../screens/ExpenseEntryScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationHistoryScreen from '../screens/NotificationHistoryScreen';
import BudgetSettingsScreen from '../screens/BudgetSettingsScreen';

// Define the stack navigator parameter list
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  ExpenseType: undefined;
  ExpenseEntry: { category: string };
  Dashboard: undefined;
  NotificationHistory: undefined;
  BudgetSettings: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// App navigation component
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4682B4', // SteelBlue color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ExpenseType" 
          component={ExpenseTypeScreen} 
          options={{ title: 'Select Expense Category' }} 
        />
        <Stack.Screen 
          name="ExpenseEntry" 
          component={ExpenseEntryScreen} 
          options={{ title: 'Add Expense' }} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'KopiMoney Dashboard' }} 
        />
        <Stack.Screen 
          name="NotificationHistory" 
          component={NotificationHistoryScreen} 
          options={{ title: 'Notifications' }} 
        />
        <Stack.Screen 
          name="BudgetSettings" 
          component={BudgetSettingsScreen} 
          options={{ title: 'Budget Settings' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
