import { SafeAreaView, View } from 'react-native';

import type { MealLabel } from '../../models';
import React from 'react';
import { voiceLoggingScreenStyle } from './VoiceLoggingScreen.styles';
import { useVoiceLogging } from './useVoiceLoggingScreen';
import type { PassioFoodItem } from '@passiolife/nutritionai-react-native-sdk-v3';
import { useBranding } from '../../contexts';
import { BackNavigation, Text, BasicButton } from '../../components';
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
      <BackNavigation title={'Voice Logging'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentView}>
          <View style={styles.textView}>
            <Text weight="400" size="_14px" numberOfLines={3}>
              I had scrambled egg whites, turkey bacon, whole grain toast, and a
              black coffee for breakfast
            </Text>
          </View>
          <View>
            <Text size="_16px" weight="400">
              Tap{' '}
              <Text size="_16px" weight="600">
                Start Listening,
              </Text>{' '}
              then say something like:
            </Text>
            <Text size="_16px" weight="400" style={styles.contentText}>
              “I had one blueberry muffin and a cup of green tea for my
              breakfast”
            </Text>
          </View>
          <View style={styles.btnView}>
            <BasicButton text="Start Listening" />
          </View>
        </View>
      </SafeAreaView>

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
