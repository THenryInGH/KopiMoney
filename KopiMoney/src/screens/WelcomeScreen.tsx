import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { initializeTestData } from '../utils/debug';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('Dashboard');
  };
  
  const handleDemoMode = async () => {
    try {
      // Initialize test data
      await initializeTestData();
      
      // Navigate to dashboard
      Alert.alert(
        'Demo Mode Activated',
        'Sample data has been loaded for you to explore the app.',
        [{ text: 'OK', onPress: () => navigation.replace('Dashboard') }]
      );
    } catch (error) {
      console.error('Error initializing demo mode:', error);
      Alert.alert('Error', 'Failed to initialize demo mode. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to KopiMoney</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Take control of your finances with KopiMoney - the simple way to track your expenses
          and stay within budget.
        </Text>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Track Expenses</Text>
            <Text style={styles.featureText}>
              Easily record your daily expenses across various categories
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Set Budgets</Text>
            <Text style={styles.featureText}>
              Define monthly budgets and get alerts when you approach limits
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Visualize Spending</Text>
            <Text style={styles.featureText}>
              See where your money is going with intuitive charts
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Timely Reminders</Text>
            <Text style={styles.featureText}>
              Get notifications about your spending habits
            </Text>
          </View>
        </View>
      </View>      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedText}>GET STARTED</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.demoButton} onPress={handleDemoMode}>
        <Text style={styles.demoButtonText}>TRY DEMO MODE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4682B4',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
  },
  getStartedButton: {
    backgroundColor: '#4682B4',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginVertical: 20,
  },  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4682B4',
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
  },
  demoButtonText: {
    color: '#4682B4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
