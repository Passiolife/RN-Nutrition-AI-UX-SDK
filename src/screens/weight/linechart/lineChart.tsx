import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
} from 'victory-native';
import { useBranding } from '../../../contexts';

export type WeightTrendChart = {
  value: number;
  label: string;
};

interface WeightTrendChartProps {
  data: WeightTrendChart[];
}

export const WeightTrendChart = ({ data }: WeightTrendChartProps) => {
  const { primaryColor, black } = useBranding();

  const maxValue = Math.max(...data.map((o) => o.value));

  // const newData = [
  //   { label: 'Mon', value: 10 },
  //   { label: 'Tue', value: 20 },
  //   { label: 'Wed', value: 30 },
  //   { label: 'Thu', value: 15 },
  //   { label: 'Fri', value: 45 },
  //   { label: 'Sat', value: 33 },
  //   { label: 'Sun', value: 50 },
  // ];
  return (
    <View style={{ overflow: 'hidden', marginVertical: 20 }}>
      <VictoryChart
        domainPadding={{ x: 16 }}
        width={Dimensions.get('window').width - 45}
        theme={VictoryTheme.material}
        padding={{ left: 40, right: 30, bottom: 30, top: 10 }}
        height={150}
      >
        <VictoryAxis
          dependentAxis={true}
          maxDomain={{ y: maxValue }}
          minDomain={{ y: 0 }}
          style={{
            grid: {
              stroke: '#CACACA',
              strokeWidth: 1,
              strokeDasharray: '6, 0',
            },
            ticks: { stroke: 'none' },
            axis: { stroke: 'none' },
            tickLabels: { fill: black },
          }}
        />
        <VictoryAxis
          tickFormat={(item, index) => {
            return data.length === 7
              ? item.slice(0, 2)
              : (index % 8 === 0 || index === data.length - 1) === true
                ? item.replace(/\D/g, '')
                : undefined;
          }}
          style={{
            tickLabels: {
              fontSize: 12,
              paddingTop: 0,
              angle: 0,
              fill: black,
            },
            grid: { stroke: 'none' },
            ticks: { stroke: 'node' },
            axis: { stroke: 'none' },
            axisLabel: { color: 'red' },
          }}
          maxDomain={{ y: maxValue }}
          minDomain={{ y: 0 }}
        />

        <VictoryLine
          style={{
            labels: { display: 'none' },
            data: { stroke: primaryColor },
          }}
          x="label"
          y="value"
          data={data}
          interpolation="basis"
        />
      </VictoryChart>
    </View>
  );
};
