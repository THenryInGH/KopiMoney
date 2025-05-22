import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation';
import { Notification } from '../models/Expense';
import { getNotifications, markNotificationAsRead } from '../services/StorageService';
import NotificationsList from '../components/NotificationsList';

type NotificationHistoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NotificationHistory'>;
};

const NotificationHistoryScreen: React.FC<NotificationHistoryScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to load notifications
  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const allNotifications = await getNotifications();
      
      // Sort notifications by date (newest first)
      const sortedNotifications = [...allNotifications].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load notifications when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [loadNotifications])
  );

  // Handle notification press
  const handleNotificationPress = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      
      // Refresh notifications
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsList
        notifications={notifications}
        onNotificationPress={handleNotificationPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default NotificationHistoryScreen;
