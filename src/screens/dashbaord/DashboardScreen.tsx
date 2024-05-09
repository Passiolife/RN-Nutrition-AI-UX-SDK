import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { safeAreaContainer } from './DashbaordScreen.Style';
import { usePassioAuthConfig } from '../scanning/usePassioAuthConfig';
import { NutritionTrackerDashboardCard } from './views/NutritionTrackerDashboardCard';
import { CustomActivityIndicator, Text } from '../../components';

export const DashboardScreen = () => {
  const { isReady } = usePassioAuthConfig();
  const styles = dashboardStyle;
  return (
    <SafeAreaView style={safeAreaContainer}>
      {isReady && <NutritionTrackerDashboardCard />}
      {!isReady && (
        <View style={styles.container}>
          <CustomActivityIndicator />
          <Text style={styles.loadingText}>
            Loading Passio SDK. Please wait...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const dashboardStyle = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: {
    marginVertical: 16,
  },
});
