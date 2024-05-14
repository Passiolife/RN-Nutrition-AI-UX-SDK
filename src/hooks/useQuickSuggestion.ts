import { useEffect, useState, useRef } from 'react';
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
import { getMealLogsForDate } from '../utils/DataServiceHelper';

const date = new Date();

export function useQuickSuggestion(mealLabel: MealLabel | 'All Day') {
  const isFocused = useIsFocused();
  const services = useServices();
  const [quickSuggestedFoodItems, setQuickSuggestedFoodItem] = useState<
    QuickSuggestion[]
  >([]);

  const prePopulatedQuickScaRef = useRef<Array<QuickSuggestion>>([]);
  const last30DayQuickScanRef = useRef<Array<QuickSuggestion>>([]);

  const removeQuickSuggestion = (suggestion: QuickSuggestion) => {
    setQuickSuggestedFoodItem((i) =>
      i.filter((suggestItem) => suggestItem.foodName !== suggestion.foodName)
    );
  };
  useEffect(() => {
    const meal = mealLabelByDate(new Date());

    const initData = async () => {
      let quickSuggestions: QuickSuggestion[] = [];
      if (isFocused) {
        const allAnalyticsQuickSuggestions =
          await getAllAnalyticQuickSuggestionRecords();

        if (
          last30DayQuickScanRef.current === null ||
          last30DayQuickScanRef.current.length === 0
        ) {
          const last30DaysQuickSuggestions =
            await getLast30SaysQuickSuggestions(meal, services);
          last30DayQuickScanRef.current = last30DaysQuickSuggestions;
        }

        if (
          prePopulatedQuickScaRef.current === null ||
          prePopulatedQuickScaRef.current.length === 0
        ) {
          const prePopulatedQuickSuggestions = await passioSuggestedFoods(date);
          prePopulatedQuickScaRef.current = prePopulatedQuickSuggestions.filter(
            (item): item is QuickSuggestion => !!item
          );
        }

        quickSuggestions = [
          ...allAnalyticsQuickSuggestions,
          ...last30DayQuickScanRef.current,
          ...prePopulatedQuickScaRef.current,
        ];

        const todayMeal = await getMealLogsForDate(new Date(), services);
        const names = todayMeal.flatMap((i) => i.name);

        const combinedQuickSuggestions = quickSuggestions
          .filter((item) => !names.includes(item.foodName))
          .reduce((previous: QuickSuggestion[], current) => {
            const logs = previous.find(
              (item) =>
                item.id === current.id || item.foodName === current.foodName
            );
            if (!logs) {
              return previous.concat([current]);
            } else {
              return previous;
            }
          }, []);

        setQuickSuggestedFoodItem(combinedQuickSuggestions.slice(0, 30));
      }
    };
    initData();
  }, [isFocused, mealLabel, services]);

  return {
    quickSuggestedFoodItems,
    removeQuickSuggestion,
  };
}
