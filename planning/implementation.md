The development of the Kopi Money followed a structured process. Key implementation steps and code constructs are described below.

6.1 Environment Setup
A new Expo project was created using:
npx create-expo-app KopiMoney --template expo-template-blank-typescript
This set up a React Native (TypeScript) environment.

Necessary and useful packages installed include:
npx expo install @react-native-async-storage/async-storage react-native-chart-kit @react-native-picker/picker expo-notifications @react-navigation/native @react-navigation/native-stack expo-splash-screen expo-app-loading

Where:

- @react-native-async-storage/async-storage: For persistent local storage of expenses and budget data.
- react-native-chart-kit: For rendering charts (dashboard visualizations).
- @react-native-picker/picker: For category selection UI.
- expo-notifications: For local push notifications.
- @react-navigation/native, @react-navigation/native-stack: For screen navigation and stack navigation.
- expo-splash-screen: For custom splash screens.
- expo-app-loading: For loading assets before the app is ready.

TypeScript configuration (tsconfig.json) was confirmed to target React Native (ES2019).
The project structure was organized with folders like components/, screens/, and models/ for maintainability.
Where
components/ (reusable UI elements)
screens/ (each app screen)
models/ (TypeScript interfaces for data)

6.2 Data Model (TypeScript Interfaces)
The core data model is the Expense interface (Table 1). In code, it looks like:
export interface Expense {
id: string;
amount: number;
category: string;
date: string;
note: string;
}
A Budget interface was also defined with fields for limit: number and month: string (e.g. "2025-05"). These interfaces ensure type safety across the app. For example, a function to save an expense is typed as async function saveExpense(exp: Expense): Promise<void>.

6.3 Core Features
• Add/Save Expense: In the AddExpenseScreen component, users fill out the form. Upon tapping "Add Expense", an handleAddExpense() function is called. This function:

1. Validates input (e.g. checks amount > 0 and category selected).
2. Creates a new Expense object with a UUID (using uuidv4()), fills in fields.
3. Retrieves existing expenses from AsyncStorage (e.g. key "expenses", parse JSON) and appends the new entry.
4. Saves the updated array back to AsyncStorage with await AsyncStorage.setItem('expenses', JSON.stringify(expenses)).
5. Updates the state to refresh any expense list in memory.
   After saving, the app immediately triggers a notification (see below).
   • Push Notification on Addition: Using expo-notifications, the app requests permissions on launch. In handleAddExpense(), after successful save, the code calls:
   await Notifications.scheduleNotificationAsync({
   content: { title: "Expense Added", body: `You spent RM ${amount.toFixed(2)}` },
   trigger: null // immediate
   });
   This displays a system notification confirming the expense record. The payload is dynamic, including amount and category.
   • Budget Checking Logic: After adding the expense, the app recomputes the total spending for the current month. Pseudocode:
   const expensesThisMonth = expenses.filter(e => e.date.startsWith(currentMonth));
   const total = sum(expensesThisMonth.map(e => e.amount));
   if (total > currentBudget.limit) {
   // Trigger over-budget notification
   await Notifications.scheduleNotificationAsync({
   content: { title: "Budget Exceeded",
   body: `You have spent RM ${total}, which exceeds your budget of RM ${currentBudget.limit}.` },
   trigger: null
   });
   }
   The budget check runs each time an expense is added. Optionally, the app could also schedule a daily check using repeating notifications.
   • Dashboard Charts: In DashboardScreen, the stored expenses are aggregated by category to feed into a chart. For example, to create pie chart data:
   const chartData = categories.map(cat => {
   const sumCat = expensesThisMonth
   .filter(e => e.category === cat)
   .reduce((sum, e) => sum + e.amount, 0);
   return { name: cat, amount: sumCat, color: getColor(cat), legendFontSize: 14, legendFontColor: "#000" };
   });
   We then render <PieChart data={chartData} ... /> from react-native-chart-kit. The component is given a fixed width/height and configuration for colors. Similarly, a bar chart (<BarChart>) could be used. This visualizes spending distribution, and the code automatically updates the data when expenses change.
   • Validation and Error Handling: The form fields include validation logic. If a user enters non-numeric text in the amount field, an error message is shown and saving is disabled. Similarly, if no category is chosen, the "Add" button remains disabled. This ensures data integrity. In code, we use useState hooks to track form values and error flags, and conditionally render <Text> with a red error message when validation fails.
   6.4 Dependencies and Configuration
   The package.json lists important dependencies:
   "dependencies": {
   "expo": "~49.0.11",
   "react": "18.2.0",
   "react-native": "0.72.4",
   "expo-notifications": "~0.18.0",
   "@react-native-async-storage/async-storage": "~1.18.9",
   "react-native-chart-kit": "^6.12.0",
   "@react-native-picker/picker": "2.4.10"
   }
   Expo's JSON configuration (app.json) includes a notification icon (custom PNG) under expo.notifications. This ensures push notifications use the app's branding.
