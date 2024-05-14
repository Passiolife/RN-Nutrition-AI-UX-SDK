import { PassioSDK } from '@passiolife/nutritionai-react-native-sdk-v3/src/sdk/v2';
import type { MealLabel } from '../models/MealLabel';
import type { QuickSuggestion } from '../models/QuickSuggestion';
import { type Services } from '../contexts';
import { substrateDate } from '../utils/DateUtils';
import { AsyncStorageHelper } from '../utils/AsyncStorageHelper';
import type { AnalyticsFoodLogs } from '../models/PassioAnalytics';

export const createQuickSuggestionFromAnalyticsFoodLog = async (
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

export const getAllAnalyticQuickSuggestionRecords = async () => {
  const analyticsFoodLogs = await AsyncStorageHelper.getAnalyticsFoodLogs();
  const quickSuggestion = await Promise.all(
    analyticsFoodLogs
      // sort the data as engagement high
      .sort((dataA, dataB) => dataB.engagement - dataA.engagement)
      .reduce((previous: AnalyticsFoodLogs[], current) => {
        // avoid duplicate passioID
        const logs = previous.find(
          (item) =>
            item.id === current.id ||
            (item.foodLog &&
              current.foodLog &&
              item.foodLog?.name === current.foodLog?.name)
        );
        if (!logs) {
          return previous.concat([current]);
        } else {
          return previous;
        }
      }, [])
      .map(createQuickSuggestionFromAnalyticsFoodLog)
  );
  return quickSuggestion.filter((item) => item !== null) as QuickSuggestion[];
};

export async function getLast30SaysQuickSuggestions(
  foodMealLabel: MealLabel,
  service: Services
): Promise<Array<QuickSuggestion>> {
  const meals = await service.dataService.getMealLogs(
    substrateDate(30),
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
