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
import Voice, {
  SpeechEndEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';

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

  const [isRecording, setIsRecord] = useState(false);
  const [isFetchingResponse, setFetchResponse] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [PassioSpeechRecognitionResult, setPassioSpeechRecognitionModel] =
    useState<PassioSpeechRecognitionModel[] | null>(null);

  const recognizeSpeechRemote = useCallback(async (text: string) => {
    try {
      setFetchResponse(true);
      setPassioSpeechRecognitionModel(null);
      const val = await PassioSDK.recognizeSpeechRemote(text);
      if (val) {
        bottomSheetModalRef.current?.expand();
        setPassioSpeechRecognitionModel(val);
      }
    } catch (error) {
    } finally {
      setFetchResponse(false);
    }
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

    navigation.pop(1);
    navigation.navigate('BottomNavigation', {
      screen: 'MealLogScreen',
    });
  };

  const onTryAgainPress = () => {
    bottomSheetModalRef.current?.close();
    setSearchQuery('');
    startRecording();
  };

  const onSearchManually = () => {
    navigation.navigate('FoodSearchScreen', {
      logToDate: route.params.logToDate,
      logToMeal: route.params.logToMeal,
      from: 'MealLog',
    });
  };

  const speechStartHandler = (_e: SpeechStartEvent) => {
    setIsRecord(true);
  };
  const speechEndHandler = (_e: SpeechEndEvent) => {
    setIsRecord(false);
  };
  const speechResultsHandler = (e: SpeechResultsEvent) => {
    if (e && e.value && e.value.length > 0) {
      const text = e.value[0];
      setSearchQuery(text);
    }
  };

  const onRecordingPress = () => {
    if (isRecording) {
      stopRecording();
      setIsRecord(false);
    } else {
      startRecording();
      setIsRecord(true);
    }
  };
  const startRecording = async () => {
    setIsRecord(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {}
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecord(false);
      recognizeSpeechRemote(searchQuery);
    } catch (error) {}
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    PassioSpeechRecognitionResult,
    bottomSheetModalRef,
    snapPoints,
    isRecording,
    searchQuery,
    isFetchingResponse,
    onRecordingPress,
    onClearPress,
    recognizeSpeechRemote,
    onLogSelectPress,
    onTryAgainPress,
    onSearchManually,
  };
}
