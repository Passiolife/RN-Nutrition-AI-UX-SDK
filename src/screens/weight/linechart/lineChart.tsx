import React from 'react';
import { View } from 'react-native';

export type WeightTrendChart = {
  value: number;
  label: string;
};

interface WeightTrendChartProps {
  data: WeightTrendChart[];
}

export const WeightTrendChart = (_popes: WeightTrendChartProps) => {
  return <View style={{ overflow: 'hidden', marginVertical: 20 }} />;
};
