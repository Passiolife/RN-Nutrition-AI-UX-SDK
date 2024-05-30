import { View } from 'react-native';

import type { MealLabel } from '../../models';
import React from 'react';
import { voiceLoggingScreenStyle } from './VoiceLoggingScreen.styles';
import { useVoiceLogging } from './useVoiceLoggingScreen';
import type { PassioFoodItem } from '@passiolife/nutritionai-react-native-sdk-v3';
import { useBranding } from '../../contexts';
import { BackNavigation } from '../../components';
import BottomSheet from '@gorhom/bottom-sheet';
import { VoiceLoggingResult } from './views/VoiceLoggingResult';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export interface VoiceLoggingScreenProps {
  logToDate?: Date | undefined;
  logToMeal?: MealLabel | undefined;
  onSaveData?: (item: PassioFoodItem) => void;
}

export const VoiceLoggingScreen = gestureHandlerRootHOC(() => {
  const {
    bottomSheetModalRef,
    snapPoints,
    onLogSelectPress,
    onTryAgainPress,
    PassioSpeechRecognitionResult,
  } = useVoiceLogging();

  const branding = useBranding();
  const styles = voiceLoggingScreenStyle(branding);

  return (
    <>
      <View style={styles.container}>
        <BackNavigation title={'Voice Logging'} />
      </View>
      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetChildrenContainer}
      >
        <VoiceLoggingResult
          onLogSelect={onLogSelectPress}
          onTryAgain={onTryAgainPress}
          passioSpeechRecognitionResults={PassioSpeechRecognitionResult ?? []}
        />
      </BottomSheet>
    </>
  );
});
