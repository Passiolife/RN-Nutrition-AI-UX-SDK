import type { FoodLog } from './FoodLog';
import type { RefCode } from '@passiolife/nutritionai-react-native-sdk-v3';

export interface QuickSuggestion {
  id: RefCode | string;
  foodName: string;
  imageName?: string;
  foodLog?: FoodLog;
}
