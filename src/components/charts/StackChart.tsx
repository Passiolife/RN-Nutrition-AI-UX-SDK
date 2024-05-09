import React from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  BarChart as GiftedBarChart,
  type stackDataItem,
} from 'react-native-gifted-charts';
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
  stackData,
  showInfo = true,
}: StackChartProps) => {
  const maxValue = Math.max(
    ...stackData.flatMap((day) => day.stacks.map((stack) => stack.value))
  );

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
        <View style={styles.chartView}>
          {stackData.length > 0 && (
            <GiftedBarChart
              stackData={stackData.map((item, index) => {
                const data: stackDataItem = {
                  ...item,
                  label:
                    stackData.length === 7
                      ? item.label.slice(0, 2)
                      : (index % 8 === 0 || index === stackData.length - 1) ===
                          true
                        ? item.label.replace(/\D/g, '')
                        : undefined,

                  showXAxisIndex: false,
                  labelTextStyle: {
                    width: 100,
                    marginLeft: stackData.length > 7 ? -10 : 0,
                  },
                } as stackDataItem;
                return data;
              })}
              rulesType={'solid'}
              width={
                stackData.length > 7
                  ? Dimensions.get('screen').width - 100
                  : undefined
              }
              isAnimated={false}
              yAxisThickness={0}
              xAxisColor={'#CACACA'}
              xAxisThickness={1}
              initialSpacing={10}
              rulesThickness={1}
              rulesColor={'rgba(202, 202, 202, 1)'}
              spacing={stackData.length > 7 ? 2 : 30}
              stepValue={maxValue > 0 ? maxValue / 2 : 100}
              maxValue={maxValue > 0 ? maxValue : 200}
              stepHeight={45}
              barWidth={stackData.length > 7 ? 5 : 10}
            />
          )}
        </View>
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
