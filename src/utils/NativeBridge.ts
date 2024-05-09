import { NativeModules, Platform } from 'react-native';
import type { PatientProfile, FoodLog } from '../models';
import type { NutritionProfile } from '../types';

const { NutritionReportService, LocaleUtils } = NativeModules;

export const generateNutritionPDF = (
  foodRecord: Array<FoodLog>,
  nutritionProfile: NutritionProfile,
  patientProfile: PatientProfile,
  duration: number
): Promise<string> => {
  return NutritionReportService.generateNutritionPDF(
    JSON.stringify(foodRecord),
    JSON.stringify({ ...nutritionProfile, ...patientProfile }),
    duration
  );
};

export function usesMetricSystem(): boolean {
  if (Platform.OS === 'ios') {
    return LocaleUtils.usesMetricSystem;
  } else {
    return NutritionReportService.usesMetricSystem;
  }
}
