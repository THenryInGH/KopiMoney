import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import ExpenseTypeSelector from '../components/ExpenseTypeSelector';

type ExpenseTypeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ExpenseType'>;
};

const ExpenseTypeScreen: React.FC<ExpenseTypeScreenProps> = ({ navigation }) => {
  const handleSelectCategory = (category: string) => {
    // Navigate to ExpenseEntry with selected category
    navigation.navigate('ExpenseEntry', { category });
  };

  return (
    <View style={styles.container}>
      <ExpenseTypeSelector onSelectCategory={handleSelectCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default ExpenseTypeScreen;
