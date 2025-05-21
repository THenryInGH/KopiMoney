To ensure usability, user-friendly interfaces were created for all main screens (Figures 2–5). These interfaces focus on layout and functionality rather than detailed visuals. In each screen, standard UI elements are used to match common mobile patterns. The design rationale emphasized clarity and ease of use.
• Splash and welcome screens (Figure 2-4): A few simple splash screens and welcome pages are created to provide quick start guide to users. They include the Kopi Money's icon and plenty of welcome banners.
• Expense Type Picker (Figure 5): This screen allows the user to select an expense category. A modal picker lists options such as Food, Travel, Shopping, etc. The interface places the picker at the middle with a clear instruction ("Select an expense category"). This layout follows a linear flow: category first, then details, then submission. The design uses a light background and simple icons to avoid clutter.
• Expense Entry Form (Figure 6): The form screen displays the chosen category (with icon) and fields for date, amount and description (optional). Each field is validated: for example, amount only accepts numeric input. Error feedback (e.g. "Enter a valid amount") appears inline. The rationale is to minimize user errors and guide input. The "ADD" button is disabled until all mandatory fields are filled. This screen also shows the current date by default but allows changing it if needed, supporting back-dated entries.
• Dashboard (Figure 7): The dashboard summarizes spending. It displays a pie chart showing the proportion of expenses by category, using the react-native-chart-kit library. Below the chart, a legend lists categories and totals. The interface also includes the total spending vs. budget (e.g. "RM 800 / RM 1000 this month"). Colors are chosen to differentiate categories. The design emphasizes quick insights: at a glance, users see which category dominates spending. This aligns with best practices where charts facilitate understanding of financial data.
• Check Notification History (Figure 8): A clean interface is created for users to check the notifications history of the application. Users can easily navigate to this page using the bottom navigation bar.
• Budget Settings (Figure 9): The settings screen contains a field to set the monthly budget (numeric input) and a save button. The UI uses a simple form style consistent with the expense entry. Users can easily update the limit, and a note below the field shows the current limit for reference. This separation of settings makes the app easier to configure.

Figure 2-4: Splash and Welcome screens.
2:https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=6-63&t=8LcXOGfYNpONumIk-11
3:https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=6-64&t=8LcXOGfYNpONumIk-11
4:https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=8-154&t=8LcXOGfYNpONumIk-11
Figure 5: Expense Type Picker screen.
https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=7-72&t=8LcXOGfYNpONumIk-11
Figure 6: Expense Entry Form screen.
https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=7-74&t=8LcXOGfYNpONumIk-11
Figure 7: Dashboard with spending chart.
https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=7-75&t=8LcXOGfYNpONumIk-11
Figure 8: Check Notification History screen.
https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=9-173&t=8LcXOGfYNpONumIk-11
Figure 9: Budget Settings screen.
https://www.figma.com/design/K8CF8mDS0u5H7eSt2O2hKc/Kopi-Money?node-id=7-76&t=8LcXOGfYNpONumIk-11
The user interface is deliberately minimalistic to reduce friction. Input fields have placeholder text to hint required format (e.g. "Enter amount"). Buttons use clear action labels. The use of charts adds an engaging visual element, since data visualization is known to improve comprehension of spending habits. Overall, the UX design aims for straightforward navigation: a user can add an expense, see it reflected immediately in the dashboard, and feel alerted when needed.
