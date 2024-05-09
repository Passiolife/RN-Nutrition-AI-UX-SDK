import { useCallback, useState } from 'react';
import type { ParamList } from '../../navigaitons';
import { useRoute, type RouteProp } from '@react-navigation/native';

export const useNutritionInformation = () => {
  const { params } =
    useRoute<RouteProp<ParamList, 'NutritionInformationScreen'>>();

  const [isMore, setMore] = useState<boolean>(false);
  const [isInfo, setInfo] = useState<boolean>(true);

  const onMorePress = useCallback(() => {
    setMore((more) => !more);
  }, []);

  const onInfoPress = useCallback(() => {
    setInfo((i) => !i);
  }, []);

  return {
    isMore,
    nutrients: isMore ? params.nutrient : params.nutrient.slice(0, 10),
    onMorePress,
    onInfoPress,
    isInfo,
  };
};
