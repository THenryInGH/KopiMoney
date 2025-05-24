Here's a README for your GitHub repository, "KopiMoney", based on the information you provided:

---

# KopiMoney - Budget Tracker with Push Notifications

KopiMoney is a cross-platform mobile application designed to help users manage their personal finances by tracking expenses and setting monthly budgets. Developed with React Native and Expo, the app provides timely push notifications to keep users aware of their spending habits and prevent overspending. [cite: 7, 10, 15, 186]

## Table of Contents

- [Features](https://www.google.com/search?q=%23features)
- [Motivation](https://www.google.com/search?q=%23motivation)
- [Technology Stack](https://www.google.com/search?q=%23technology-stack)
- [Architecture](https://www.google.com/search?q=%23architecture)
- [Installation](https://www.google.com/search?q=%23installation)
- [Usage](https://www.google.com/search?q=%23usage)
- [Testing & Evaluation](https://www.google.com/search?q=%23testing--evaluation)
- [Future Enhancements](https://www.google.com/search?q=%23future-enhancements)
- [License](https://www.google.com/search?q=%23license)
- [Contact](https://www.google.com/search?q=%23contact)

## Features

KopiMoney includes the following key features:

- **Expense Categorization**[cite: 30]: Users can select from predefined expense types (e.g., Food, Travel, Shopping) using a picker control.
- **Expense Entry**[cite: 31]: Users can record expense amounts and optional notes, with all data saved locally on the device.
- **Push Notifications**[cite: 32, 33]:
  - Confirmation notifications are sent upon successful expense entry. [cite: 9, 32]
  - "Over Budget" alerts are automatically triggered if the total monthly spending exceeds the user-set budget. [cite: 10, 33]
- **Budget Limit Setting**[cite: 34]: Users can easily set or update their monthly budget within the app's settings.
- **Dashboard View**[cite: 35]: A summary screen displays spending by category using pie charts, providing a clear visualization of expenditure patterns. [cite: 11, 35]
- **Notification History**[cite: 105]: Users can check a history of their notifications within the application.

## Motivation

Despite a significant rise in digital payment adoption in Malaysia, financial literacy remains low, leading many individuals to struggle with budgeting and saving. [cite: 5, 19, 20] Research indicates that personal finance applications can enhance financial behaviors by offering visibility and control over spending. [cite: 6] KopiMoney aims to address the common problem of overspending by providing timely budget alerts, similar to other popular budgeting apps like PocketGuard and Mint, which warn users when they are nearing or exceeding their financial limits. [cite: 23, 24, 25, 27] The app's design is motivated by the need to offer behavioral nudges that encourage immediate reaction to overspending, thereby fostering financial discipline. [cite: 15, 26, 28]

## Technology Stack

- **React Native**[cite: 39, 40, 118]: A popular framework for building cross-platform mobile applications using JavaScript or TypeScript. It enables a single codebase for both iOS and Android. [cite: 40]
- **Expo**[cite: 42, 45, 117]: An ecosystem and toolset that simplifies React Native development with a managed workflow, pre-built components, and over-the-air updates. It is used here to expedite development and leverage its built-in notification service. [cite: 45]
- **TypeScript**[cite: 41, 118, 123]: Provides static type checking, enhancing code reliability and maintainability.
- **AsyncStorage**[cite: 47, 52, 75]: A simple, unencrypted, asynchronous, persistent, key-value storage system for local data persistence. It's used for storing expense records and budget settings. [cite: 52, 75, 128]
- **expo-notifications**[cite: 54, 55, 130]: For handling push and local notifications on Android and iOS devices, abstracting over platform-specific services. [cite: 55]
- **react-native-chart-kit**[cite: 101, 140]: Used for rendering interactive charts, specifically pie charts, to visualize spending patterns on the dashboard.
- **@react-native-picker/picker**[cite: 118]: For creating the expense category picker control.
- **uuidv4()**[cite: 126]: Used to generate unique identifiers for each expense entry.

## Architecture

The KopiMoney application follows a layered design, as illustrated in the system architecture diagram (Figure 1 in the project report).

- **UI Layer (React Native screens)**[cite: 70]: Consists of `ExpenseEntryScreen`, `BudgetSettingsScreen`, and `DashboardScreen`. These components collect user input and dispatch actions to the logic layer. [cite: 72, 73]
- **Logic Layer**[cite: 70]: Handles business logic, data validation, and notification triggers. It processes user actions, updates storage, and interacts with the Expo Notification API. [cite: 74]
- **Data Layer**[cite: 70]: Manages local data persistence using AsyncStorage (with the potential for future migration to SQLite for larger datasets). [cite: 52, 75] The core data model is the `Expense` interface, which includes fields like `id`, `amount`, `category`, `date`, and `note`. [cite: 76, 83, 121]

The application triggers local immediate notifications upon each expense addition using `scheduleNotificationAsync`. [cite: 59, 131] The logic layer also continuously checks the monthly total against the user-set budget, triggering an "Over Budget" notification if the limit is exceeded. [cite: 9, 10, 78, 79, 135]

## Installation

To set up the KopiMoney project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/THenryInGH/KopiMoney.git
    cd KopiMoney
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

    This will install all necessary packages, including `expo`, `react-native-async-storage`, `react-native-chart-kit`, `@react-native-picker/picker`, and `expo-notifications`. [cite: 118]

3.  **Start the Expo development server:**

    ```bash
    npx expo start
    ```

    This will open the Expo Dev Tools in your browser.

4.  **Run on a device or emulator:**

    - Scan the QR code with the Expo Go app on your mobile device (iOS or Android).
    - Press `a` to run on an Android emulator.
    - Press `i` to run on an iOS simulator.

## Usage

1.  **Welcome Screens**: Upon first launch, you'll see a series of splash and welcome screens guiding you. [cite: 90]
2.  **Set Your Budget**: Navigate to the "Budget Settings" screen to set your monthly budget limit. Enter a numeric value and tap "Save". [cite: 107]
3.  **Add an Expense**: Go to the "Expense Entry" screen.
    - Select an expense category from the picker (e.g., Food, Travel). [cite: 92, 93]
    - Enter the expense amount and an optional note. [cite: 96]
    - Tap "Add Expense". A confirmation notification ("Expense Added") will be sent. [cite: 131]
4.  **Monitor Spending**: The "Dashboard" screen displays a pie chart visualizing your spending by category, along with your total spending versus the monthly budget. [cite: 101, 102]
5.  **Budget Alerts**: If your total monthly spending exceeds the set budget, an "Over Budget" push notification will be triggered. [cite: 135, 161]
6.  **Check Notification History**: Access the notification history from the dashboard to review past alerts. [cite: 105, 106]

## Testing & Evaluation

The KopiMoney application has undergone both automated and manual testing to ensure its correctness and usability. [cite: 147]

- **Unit Testing**[cite: 148]: Jest with React Native Testing Library was used for core logic, including tests for `calculateMonthlyTotal`, `checkBudgetExceeded`, and `saveExpense` functions. [cite: 149, 150, 151]

- **Manual Test Matrix**[cite: 153]: A manual test plan covered user workflows, confirming:

  - Successful addition of valid expenses and corresponding confirmation notifications. [cite: 154]
  - Proper error handling for invalid expense inputs. [cite: 154]
  - Correct saving and display of the monthly budget. [cite: 154]
  - Reliable triggering of "Budget Exceeded" notifications when limits are surpassed. [cite: 154]
  - Accurate updates of the dashboard charts based on new expense data. [cite: 154]
  - Data persistence after app restarts. [cite: 154]

- **Notification Performance**[cite: 158]: Expo's notification service reliably delivered messages, with minimal latency observed (alerts appeared within \~1 second). [cite: 158] Over-budget alerts fired as soon as the threshold was exceeded. [cite: 161]

- **UX Feedback**[cite: 162]: Informal usability tests indicated positive user feedback, with users appreciating the instant confirmation alerts. [cite: 163]

## Future Enhancements

The KopiMoney project provides a solid foundation for future development. Potential enhancements include:

- **Cloud Synchronization**[cite: 16, 178]: Integrate a backend service (e.g., Firebase Firestore) to enable data syncing across multiple devices and prevent data loss upon app uninstallation or phone changes. [cite: 171, 178]
- **Recurring Expense Support**[cite: 179]: Allow users to input and manage recurring payments (e.g., subscriptions) with automated budget impact.
- **AI-Powered Insights**[cite: 16, 180]: Implement machine learning to analyze spending trends and offer personalized budgeting suggestions or cost-cutting tips. [cite: 180]
- **Push Notification Customization**[cite: 181]: Provide more granular settings for notification frequency (e.g., daily summary vs. per expense) and comprehensive opt-out options.
- **Currency and Localization**[cite: 182]: Support multiple currencies and date formats for a broader international user base.
- **UI Polish**[cite: 176]: Enhance the user interface with more polished designs, animations, and theme support for a richer user experience.

## License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).

## Contact

For any inquiries or feedback, please contact Tey Henry at 22004864@siswa.um.edu.my.
