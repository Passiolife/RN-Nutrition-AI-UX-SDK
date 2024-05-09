import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { PassioSDK } from '@passiolife/nutritionai-react-native-sdk-v3/src/sdk/v2';
import type { MealLabel } from '../models/MealLabel';
import type { QuickSuggestion } from '../models/QuickSuggestion';
import { type Services, useServices } from '../contexts';
import { substrateDate } from '../utils/DateUtils';
import { AsyncStorageHelper } from '../utils/AsyncStorageHelper';
import type { AnalyticsFoodLogs } from '../models/PassioAnalytics';
import { passioSuggestedFoods } from '../utils/V3Utils';

export function useQuickSuggestion(mealLabel: MealLabel | 'All Day') {
  const isFocused = useIsFocused();
  const services = useServices();
  const [quickSuggestedFoodItems, setQuickSuggestedFoodItem] = useState<
    QuickSuggestion[]
  >([]);

  const createQuickSuggestionFromAnalyticsFoodLog = async (
    analyticsFoodLog: AnalyticsFoodLogs
  ): Promise<QuickSuggestion | null> => {
    const attribute = await PassioSDK.fetchFoodItemForRefCode(
      analyticsFoodLog.id
    );
    if (attribute === null) return null;
    return {
      id: analyticsFoodLog.id,
      imageName: attribute.iconId,
      foodName: attribute.name,
    } as QuickSuggestion;
  };

  const getAllDayFoodItemSuggestion = useCallback(async () => {
    const analyticsFoodLogs = await AsyncStorageHelper.getAnalyticsFoodLogs();
    const quickSuggestion = await Promise.all(
      analyticsFoodLogs
        // sort the data as engagement high
        .sort((dataA, dataB) => dataB.engagement - dataA.engagement)
        .reduce((previous: AnalyticsFoodLogs[], current) => {
          // avoid duplicate passioID
          const logs = previous.find((item) => item.id === current.id);
          if (!logs) {
            return previous.concat([current]);
          } else {
            return previous;
          }
        }, [])
        // create QuickSuggestion of sort the analyticsFoodLogs
        .map(createQuickSuggestionFromAnalyticsFoodLog)
    );
    return quickSuggestion.filter((item) => item !== null) as QuickSuggestion[];
  }, []);

  async function getMealWiseFoodItemSuggestion(
    foodMealLabel: MealLabel,
    service: Services
  ): Promise<Array<QuickSuggestion>> {
    const meals = await service.dataService.getMealLogs(
      substrateDate(14),
      new Date()
    );
    return meals
      .filter((value) => {
        return value.meal.toLowerCase().includes(foodMealLabel.toLowerCase());
      })
      .reduce((previousQuickSuggestion: QuickSuggestion[], current) => {
        const quickSuggestion = previousQuickSuggestion.find(
          (item) => item.id === current.passioID
        );
        if (!quickSuggestion) {
          return previousQuickSuggestion.concat([
            {
              id: current.passioID,
              imageName: current.imageName,
              foodName: current.name,
            },
          ]);
        } else {
          return previousQuickSuggestion;
        }
      }, []);
  }

  useEffect(() => {
    const initData = async () => {
      let quickSuggestions: QuickSuggestion[] = [];
      if (isFocused) {
        if (mealLabel === 'All Day') {
          quickSuggestions = await getAllDayFoodItemSuggestion();
        } else {
          quickSuggestions = await getMealWiseFoodItemSuggestion(
            mealLabel,
            services
          );
        }
      }

      const prePopulatedQuickSuggestions = await passioSuggestedFoods();
      const combinedQuickSuggestions = quickSuggestions
        .concat(
          prePopulatedQuickSuggestions.filter(
            (item): item is QuickSuggestion => !!item
          )
        )
        .reduce((previous: QuickSuggestion[], current) => {
          // avoid duplicate passioID
          const logs = previous.find((item) => item.id === current.id);
          if (!logs) {
            return previous.concat([current]);
          } else {
            return previous;
          }
        }, []);

      setQuickSuggestedFoodItem(combinedQuickSuggestions);
    };
    initData();
  }, [getAllDayFoodItemSuggestion, isFocused, mealLabel, services]);

  return {
    quickSuggestedFoodItems,
  };
}
