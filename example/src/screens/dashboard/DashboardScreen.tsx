import React from 'react';
import { View } from 'react-native';

import { Text } from '@app/components';
import { useDashboard } from './useDashboard';
import dashboardStyles from './Dashboard.style';

export interface LoginScreenProps {}

const DashBoardScreen = () => {
  const {} = useDashboard();
  const styles = dashboardStyles();

  return (
    <View style={styles.bodyContainer}>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default DashBoardScreen;
