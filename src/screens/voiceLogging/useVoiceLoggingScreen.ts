import {
  PassioSDK,
  PassioSpeechRecognitionModel,
} from '@passiolife/nutritionai-react-native-sdk-v3';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLogToDate, mealLabelByDate } from '../../utils';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { ParamList } from '../../navigaitons';
import { convertPassioFoodItemToFoodLog } from '../../utils/V3Utils';
import { useServices } from '../../contexts';
import type { StackNavigationProp } from '@react-navigation/stack';
import type BottomSheet from '@gorhom/bottom-sheet';

export type VoiceLoggingScreenNavigationProps = StackNavigationProp<
  ParamList,
  'VoiceLoggingScreen'
>;

export function useVoiceLogging() {
  const services = useServices();
  const navigation = useNavigation<VoiceLoggingScreenNavigationProps>();
  const route = useRoute<RouteProp<ParamList, 'VoiceLoggingScreen'>>();
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);

  const [PassioSpeechRecognitionResult, setPassioSpeechRecognitionModel] =
    useState<PassioSpeechRecognitionModel[] | null>(null);

  const recognizeSpeechRemote = useCallback(async (text: string) => {
    try {
      setPassioSpeechRecognitionModel(null);
      const val = await PassioSDK.recognizeSpeechRemote(text);
      if (val) {
        bottomSheetModalRef.current?.expand();
        setPassioSpeechRecognitionModel(val);
      }
    } catch (error) {}
  }, []);

  const onClearPress = () => {
    setPassioSpeechRecognitionModel(null);
  };

  const onLogSelectPress = async (selected: PassioSpeechRecognitionModel[]) => {
    const logToDate = getLogToDate(
      route.params.logToDate,
      route.params.logToMeal
    );
    const meal =
      route.params.logToMeal === undefined
        ? mealLabelByDate(logToDate)
        : route.params.logToMeal;

    selected.forEach(async (item) => {
      if (item.advisorInfo.foodDataInfo) {
        const foodItem = await PassioSDK.fetchFoodItemForDataInfo(
          item.advisorInfo.foodDataInfo
        );
        if (foodItem) {
          const foodLog = convertPassioFoodItemToFoodLog(
            foodItem,
            logToDate,
            meal
          );
          await services.dataService.saveFoodLog(foodLog);
        }
      }
    });
  };

  const onTryAgainPress = () => {
    bottomSheetModalRef.current?.close();
  };

  const onSearchManually = () => {
    navigation.navigate('FoodSearchScreen', {
      logToDate: route.params.logToDate,
      logToMeal: route.params.logToMeal,
      from: 'MealLog',
    });
  };

  useEffect(() => {
    recognizeSpeechRemote('recipe of banana cake');
  }, [recognizeSpeechRemote]);

  return {
    PassioSpeechRecognitionResult,
    bottomSheetModalRef,
    snapPoints,
    onClearPress,
    recognizeSpeechRemote,
    onLogSelectPress,
    onTryAgainPress,
    onSearchManually,
  };
}
