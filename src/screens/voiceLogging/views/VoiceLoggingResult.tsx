import React, { useState } from 'react';
import {
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
  FlatList,
} from 'react-native';
import { COLORS } from '../../../constants';
import { Text } from '../../../components/texts/Text';
import type { PassioSpeechRecognitionModel } from '@passiolife/nutritionai-react-native-sdk-v3';
import { VoiceLoggingResultItemView } from './VoiceLoggingResultItemView';
import { BasicButton } from '../../../components';

interface Props {
  style?: StyleProp<ViewStyle>;
  passioSpeechRecognitionResults: Array<PassioSpeechRecognitionModel>;
  onTryAgain: () => void;
  onLogSelect: (selected: PassioSpeechRecognitionModel[]) => void;
}
export interface VoiceLoggingResultRef {}

export const VoiceLoggingResult = React.forwardRef(
  (
    { style, passioSpeechRecognitionResults, onTryAgain, onLogSelect }: Props,
    _ref: React.Ref<VoiceLoggingResultRef>
  ) => {
    const renderFooter = () => {
      return <View style={styles.footer} />;
    };

    const [selected, setSelected] = useState<PassioSpeechRecognitionModel[]>();

    const onFoodSelect = (result: PassioSpeechRecognitionModel) => {
      const find = selected?.find(
        (item) =>
          item.advisorInfo?.recognizedName ===
          result.advisorInfo?.recognizedName
      );
      if (find) {
        setSelected((item) =>
          item?.filter(
            (i) =>
              i.advisorInfo?.recognizedName !==
              result.advisorInfo?.recognizedName
          )
        );
      } else {
        setSelected((item) => [...(item ?? []), result]);
      }
    };

    return (
      <View style={[styles.itemsContainer, style]}>
        <Text
          weight="600"
          size="_18px"
          color="text"
          style={styles.quickSuggestionTextStyle}
        >
          Results
        </Text>
        <Text
          weight="500"
          size="_14px"
          color="secondaryText"
          style={styles.noQuickSuggestionTitle}
        >
          Select the foods you would like to log
        </Text>
        <FlatList
          style={styles.list}
          data={passioSpeechRecognitionResults}
          ListFooterComponent={renderFooter}
          renderItem={({ item }: { item: PassioSpeechRecognitionModel }) => {
            return (
              <VoiceLoggingResultItemView
                foodName={item.advisorInfo?.recognizedName}
                imageName={item.advisorInfo?.foodDataInfo?.iconID}
                bottom="1 cup | 173 cal"
                onFoodLogEditor={() => {}}
                onFoodLogSelect={() => {
                  onFoodSelect(item);
                }}
                isSelected={
                  selected?.find((it) => it.advisorInfo?.recognizedName) !==
                  undefined
                }
              />
            );
          }}
        />
        <View style={styles.buttonContainer}>
          <BasicButton
            secondary
            onPress={onTryAgain}
            style={styles.buttonTryAgain}
            text="Try Again"
          />
          <BasicButton
            onPress={() => {
              onLogSelect(selected ?? []);
            }}
            style={styles.buttonLogSelected}
            text="Log Selected"
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: 'white',
  },
  footer: {
    height: 120,
  },
  list: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  quickSuggestionTextStyle: {
    alignSelf: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  noQuickSuggestionTitle: {
    paddingHorizontal: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  noQuickSuggestionDescriptions: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'justify',
    fontWeight: '400',
    paddingHorizontal: 32,
    color: COLORS.grey7,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonTryAgain: { flex: 1, marginStart: 16, marginEnd: 8 },
  buttonLogSelected: { flex: 1, marginEnd: 16, marginStart: 8 },
});
