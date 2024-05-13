import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { MealLabel } from '../models/MealLabel';
import type { QuickSuggestion } from '../models/QuickSuggestion';
import { useServices } from '../contexts';
import { passioSuggestedFoods } from '../utils/V3Utils';
import {
  getAllAnalyticQuickSuggestionRecords,
  getLast30SaysQuickSuggestions,
  mealLabelByDate,
} from '../utils';

const date = new Date();

export function useQuickSuggestion(mealLabel: MealLabel | 'All Day') {
  const isFocused = useIsFocused();
  const services = useServices();
  const [quickSuggestedFoodItems, setQuickSuggestedFoodItem] = useState<
    QuickSuggestion[]
  >([]);

  useEffect(() => {
    const meal = mealLabelByDate(new Date());

    const initData = async () => {
      let quickSuggestions: QuickSuggestion[] = [];
      if (isFocused) {
        const allAnalyticsQuickSuggestions =
          await getAllAnalyticQuickSuggestionRecords();
        const last30DaysQuickSuggestions = await getLast30SaysQuickSuggestions(
          meal,
          services
        );
        const prePopulatedQuickSuggestions = await passioSuggestedFoods(date);

        quickSuggestions = [
          ...allAnalyticsQuickSuggestions,
          ...last30DaysQuickSuggestions,
        ];

        const combinedQuickSuggestions = quickSuggestions
          .concat(
            prePopulatedQuickSuggestions.filter(
              (item): item is QuickSuggestion => !!item
            )
          )
          .reduce((previous: QuickSuggestion[], current) => {
            const logs = previous.find((item) => item.id === current.id);
            if (!logs) {
              return previous.concat([current]);
            } else {
              return previous;
            }
          }, []);

        setQuickSuggestedFoodItem(combinedQuickSuggestions);
      }
    };
    initData();
  }, [isFocused, mealLabel, services]);

  return {
    quickSuggestedFoodItems,
  };
}
