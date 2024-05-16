import React from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  FlatList,
} from 'react-native';
import { scaledSize, scaleHeight, scaled, scaleWidth } from '../../utils';
import { useBranding } from '../../contexts';
import type { Branding } from '../../contexts';
import { Card } from '../cards';
import { Text } from '../texts';
export interface StackDataType {
  value: number;
  color: string;
}

export interface StackChartData {
  stacks: StackDataType[];
  label: string;
}

export interface legendDataTyle {
  color: string;
  label: string;
}

export interface StackChartProps {
  title?: string;
  barChartContainerStyle?: StyleProp<ViewStyle>;
  stackData: StackChartData[];
  showInfo?: boolean;
  target?: number;
}

const chartLegendData: legendDataTyle[] = [
  { color: '#F59E0B', label: 'Calories' },
  { color: '#10B981', label: 'Protein' },
  { color: '#8B5CF6', label: 'Fat' },
  { color: '#0EA5E9', label: 'Carbs' },
];

export const StackChart = ({
  title = 'Macros',
  showInfo = true,
}: StackChartProps) => {
  const styles = stackChartStyle(useBranding());

  const renderLegends = ({ item }: { item: legendDataTyle }) => {
    return (
      <View style={styles.indicatorView}>
        <View style={[styles.indicator, { backgroundColor: item.color }]} />
        <Text weight="400" size="_14px" color="text">
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Card style={styles.roundedAndShadowView}>
        <Text size="_18px" weight="600" color="text">
          {title}
        </Text>
        <View style={styles.chartView} />
      </Card>
      {showInfo && (
        <View style={styles.legendView}>
          <FlatList
            data={chartLegendData}
            horizontal
            keyExtractor={(item) => item.label}
            renderItem={renderLegends}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContentContainerStyle}
          />
        </View>
      )}
    </View>
  );
};

const stackChartStyle = ({}: Branding) =>
  StyleSheet.create({
    roundedAndShadowView: {
      borderRadius: scaledSize(16),
      paddingVertical: scaledSize(16),
      paddingHorizontal: scaledSize(8),
      marginHorizontal: scaledSize(8),
      marginVertical: scaledSize(8),
    },
    chartView: {
      marginTop: scaleHeight(30),
    },
    legendView: {
      marginTop: scaleHeight(16),
    },
    indicator: {
      ...scaled(12),
      borderRadius: 6,
      marginRight: scaleWidth(8),
    },
    indicatorView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: scaleWidth(12),
    },
    flatListContentContainerStyle: {
      justifyContent: 'center',
      flex: 1,
    },
  });
