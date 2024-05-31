import React from 'react';
import { EntryProvider } from '../contexts/entry/EntryContext';
import { NutritionNavigator } from './Nutrition-Navigator';
import { useNavigation } from '@react-navigation/native';

export const PassioScreens = () => {
  const navigation = useNavigation();
  return (
    <EntryProvider
      entry={{
        onBackToHost() {
          navigation.goBack();
        },
      }}
    >
      <NutritionNavigator />
    </EntryProvider>
  );
};
