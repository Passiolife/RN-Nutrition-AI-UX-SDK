import {
  Dimensions,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import React from 'react';
import { Text } from '../texts';
import { useBranding } from '../../contexts';
import type { Branding } from '../../contexts';
import { scaledSize, scaleHeight } from '../../utils';
import {
  BarChart as GiftedBarChart,
  type barDataItem,
} from 'react-native-gifted-charts';
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
  barData,
}: BarChartProps) => {
  const styles = barChartStyle(useBranding());

  const maxValue = Math.max(...barData.map((o) => o.value));

  return (
    <View style={barChartContainerStyle}>
      <Card style={styles.roundedAndShadowView}>
        <Text size="_18px" weight="600" color="text">
          {title}
        </Text>

        <View style={styles.chartView}>
          <GiftedBarChart
            data={barData.map((item, index) => {
              const items: barDataItem = {
                ...item,
                label:
                  barData.length === 7
                    ? item.label.slice(0, 2)
                    : (index % 8 === 0 || index === barData.length - 1) === true
                      ? item.label.replace(/\D/g, '')
                      : undefined,

                labelTextStyle: {
                  width: 30,
                  marginLeft: barData.length > 7 ? -10 : 4,
                },
              };
              return items;
            })}
            spacing={barData.length > 7 ? 2 : 30}
            width={
              barData.length > 7
                ? Dimensions.get('screen').width - 100
                : undefined
            }
            rulesType="solid"
            isAnimated={false}
            yAxisThickness={0}
            xAxisColor={'#CACACA'}
            xAxisThickness={1}
            rulesThickness={1}
            rulesColor={'#CACACA'}
            initialSpacing={16}
            maxValue={maxValue > 0 ? maxValue : 100}
            stepValue={maxValue > 0 ? maxValue / 2 : 50}
            stepHeight={50}
            frontColor={'rgba(79, 70, 229, 1)'}
            barWidth={barData.length > 7 ? 6 : 10}
          />
        </View>
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
