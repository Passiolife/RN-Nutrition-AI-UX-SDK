import React from 'react';
import { View } from 'react-native';
import { LineChart, type lineDataItem } from 'react-native-gifted-charts';
import { screenWidth } from '../../../utils';

export type WeightTrendChart = {
  value: number;
  label: string;
};

interface WeightTrendChartProps {
  data: WeightTrendChart[];
}

export const WeightTrendChart = ({ data }: WeightTrendChartProps) => {
  const maxValue = Math.max(...data.map((o) => o.value));
  return (
    <View style={{ overflow: 'hidden', marginVertical: 20 }}>
      <LineChart
        data={data.map((item, index) => {
          const items: lineDataItem = {
            ...item,
            label:
              data.length === 7
                ? item.label.slice(0, 2)
                : (index % 8 === 0 || index === data.length - 1) === true
                  ? item.label.replace(/\D/g, '')
                  : undefined,

            labelTextStyle: {
              marginLeft: data.length > 7 ? -10 : 0,
            },
          };
          return items;
        })}
        spacing={data.length > 7 ? screenWidth / 45 : screenWidth / 9.5}
        adjustToWidth
        width={screenWidth}
        curved
        noOfSectionsBelowXAxis={0.2}
        maxValue={maxValue > 0 ? maxValue + 20 : 100}
        stepValue={maxValue > 0 ? maxValue / 2 : 50}
        stepHeight={50}
        color="blue"
        xAxisLabelsVerticalShift={10}
        yAxisColor="transparent"
        xAxisColor="transparent"
        dataPointsColor="blue"
        rulesType="solid"
      />
    </View>
  );
};
