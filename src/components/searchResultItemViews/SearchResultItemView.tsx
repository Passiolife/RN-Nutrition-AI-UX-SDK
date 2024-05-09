import { TouchableOpacity, View, Image } from 'react-native';

import { Card } from '../cards';
import { PassioFoodIcon } from '../passio/PassioFoodIcon';
import type { PassioID } from '@passiolife/nutritionai-react-native-sdk-v3/src/sdk/v2';
import type { PassioIDEntityType } from '@passiolife/nutritionai-react-native-sdk-v3/src/sdk/v2';
import React from 'react';
import styles from './SearchResultItemView.style';
import { Text } from '../texts';
import { ICONS } from '../../assets';

interface Props {
  passioID: PassioID;
  imageName: string;
  name: string;
  brandName?: string;
  onPressSearchResult: () => void;
  entityType: PassioIDEntityType;
}

const SearchResultItemView = ({
  passioID,
  name,
  onPressSearchResult,
  entityType,
  brandName,
  imageName,
}: Props) => {
  return (
    <Card style={styles.shadowContainer}>
      <TouchableOpacity
        style={styles.mealContainer}
        onPress={onPressSearchResult}
      >
        <View style={styles.mealImgLayout}>
          <PassioFoodIcon
            passioID={passioID}
            imageName={imageName}
            style={styles.mealImg}
            entityType={entityType}
          />
        </View>
        <View style={styles.mealDetail}>
          <Text weight="600" size="_14px" color="text" style={styles.mealName}>
            {name}
          </Text>
          {brandName && (
            <Text
              weight="400"
              size="_14px"
              color="secondaryText"
              style={styles.brand}
            >
              {brandName}
            </Text>
          )}
        </View>
        <View style={styles.addFoodIconView}>
          <Image source={ICONS.newAddPlus} style={styles.addFoodIcon} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default React.memo(SearchResultItemView);
