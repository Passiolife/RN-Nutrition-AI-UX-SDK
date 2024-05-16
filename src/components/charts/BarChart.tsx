import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import React from 'react';
import { Text } from '../texts';
import { useBranding } from '../../contexts';
import type { Branding } from '../../contexts';
import { scaledSize, scaleHeight } from '../../utils';

import { Card } from '../cards';

export interface ChartData {
  value: number;
  label: string;
}

export interface BarChartProps {
  title?: string;
  barChartContainerStyle?: StyleProp<ViewStyle>;
  barData: ChartData[];
}

export const BarChart = ({
  title = 'Calories',
  barChartContainerStyle,
}: BarChartProps) => {
  const styles = barChartStyle(useBranding());

  return (
    <View style={barChartContainerStyle}>
      <Card style={styles.roundedAndShadowView}>
        <Text size="_18px" weight="600" color="text">
          {title}
        </Text>

        <View style={styles.chartView} />
      </Card>
    </View>
  );
};

const barChartStyle = ({}: Branding) =>
  StyleSheet.create({
    roundedAndShadowView: {
      borderRadius: scaledSize(16),
      padding: scaledSize(16),
    },
    chartView: {
      marginTop: scaleHeight(20),
    },
    noData: {
      marginTop: scaleHeight(20),
      minHeight: 100,
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
