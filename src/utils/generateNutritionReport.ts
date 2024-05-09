import type { FoodLog, NutritionProfile } from '../models';

import { NativeModules } from 'react-native';
const { NutritionReportService } = NativeModules;

export const generateNutritionPDF = (
  foodRecord: Array<FoodLog>,
  userDetails: NutritionProfile,
  duration: number
): Promise<string> => {
  return NutritionReportService.generateNutritionPDF(
    JSON.stringify(foodRecord),
    JSON.stringify(userDetails),
    duration
  );
};
