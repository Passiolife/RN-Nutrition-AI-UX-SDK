import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PassioIDEntityType } from '@passiolife/nutritionai-react-native-sdk-v3';
import { ICONS } from '../../../assets';
import { PassioFoodIcon } from '../../../components/passio/PassioFoodIcon';
import { Text } from '../../../components';

interface Props {
  imageName?: string;
  foodName: string;
  bottom: string;
  onFoodLogEditor?: () => void;
  onFoodLogSelect: () => void;
  isSelected: boolean;
}

export const VoiceLoggingResultItemView = (props: Props) => {
  const { foodName, imageName, onFoodLogSelect, isSelected, bottom } = props;
  return (
    <TouchableOpacity onPress={onFoodLogSelect} style={styles.container}>
      <View style={styles.imageContainer}>
        <PassioFoodIcon
          imageName={imageName}
          style={styles.image}
          passioID={imageName}
          entityType={PassioIDEntityType.group}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text weight="600" size="_12px" style={[styles.text]}>
          {foodName}
        </Text>
        <Text weight="400" size="_12px" style={styles.text}>
          {bottom}
        </Text>
      </View>
      <TouchableOpacity onPress={onFoodLogSelect}>
        <Image
          source={isSelected ? ICONS.weeklyAdherence : ICONS.newInfo}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 242, 255, 1)',
    flex: 1,
    margin: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  imageContainer: {
    width: 42,
    marginLeft: 8,
    borderRadius: 32,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  image: {
    width: 42,
    aspectRatio: 1,
  },
  addIcon: {
    width: 24,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 16,
    height: 24,
  },
  text: {
    textTransform: 'capitalize',
    marginStart: 16,
    flex: 1,
    marginHorizontal: 5,
    marginRight: 10,
  },
});
