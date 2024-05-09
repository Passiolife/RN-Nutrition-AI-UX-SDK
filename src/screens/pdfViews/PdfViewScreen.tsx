import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Share,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useServices } from '../../contexts';
import type { NutritionProfile } from '../../models';
import type { ParamList } from '../../navigaitons';
import { Header } from '../../components';
import styles from './styles';
import { ic_chevron_left_round } from '../../assets';
import Pdf from 'react-native-pdf';
import { generateNutritionPDF } from '../../utils/NativeBridge';

export interface PdfViewScreenProps {
  startDate: Date;
  endDate: Date;
  profile?: NutritionProfile;
  duration: number;
}

export type MealLogScreenNavigationProps = StackNavigationProp<
  ParamList,
  'PdfViewScreen'
>;

// function openGenerateReportOption(): ActionSheetType[] {
//   return generateReport(
//     async () => {
//       let nutritionProfile = await getNutritionProfile();
//       if (nutritionProfile === undefined) return;
//       navigation.navigate(PdfViewScreenRoute, {
//         startDate: getOneWeek().firstday,
//         endDate: getOneWeek().lastday,
//         profile: {
//           ...nutritionProfile,
//           weight: nutritionProfile.weight,
//           height: nutritionProfile.height / 100,
//         },
//         duration: 0,
//       });
//     },
//     async () => {
//       let nutritionProfile = await getNutritionProfile();
//       if (nutritionProfile === undefined) return;
//       navigation.navigate(PdfViewScreenRoute, {
//         startDate: getTwoWeek().firstday,
//         endDate: getTwoWeek().lastday,
//         profile: {
//           ...nutritionProfile,
//           weight: nutritionProfile.weight,
//           height: nutritionProfile.height / 100,
//         },
//         duration: 1,
//       });
//     },
//     async () => {
//       let nutritionProfile = await getNutritionProfile();
//       if (nutritionProfile === undefined) return;
//       navigation.navigate(PdfViewScreenRoute, {
//         startDate: getOneMonth().firstday,
//         endDate: getOneMonth().lastday,
//         profile: {
//           ...nutritionProfile,
//           weight: nutritionProfile.weight,
//           height: nutritionProfile.height / 100,
//         },
//         duration: 2,
//       });
//     }
//   );
// }

const PdfViewScreen = () => {
  return (
    <PdfViewS
      startDate={new Date()}
      endDate={new Date()}
      profile={undefined}
      duration={0}
    />
  );
};

export const PdfViewS: React.FC<PdfViewScreenProps> = () => {
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const services = useServices();
  const navigation = useNavigation<MealLogScreenNavigationProps>();
  const { params } = useRoute<RouteProp<ParamList, 'PdfViewScreen'>>();
  const { startDate, endDate, profile, duration } = params;

  useEffect(() => {
    const initData = async () => {
      const getMealLogs = await services.dataService.getMealLogs(
        startDate,
        endDate
      );
      const patientProfile = await services.dataService.getPatientProfile();
      if (profile === undefined) {
        return;
      }

      const value = await generateNutritionPDF(
        getMealLogs,
        profile,
        patientProfile,
        duration
      ).catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
      setPdfPath(value || '');
    };
    initData();
  }, [duration, endDate, profile, startDate, services]);

  const goBackDashboard = () => {
    navigation.goBack();
  };

  const onShare = async (url: string) => {
    try {
      await Share.share({
        title: 'Nutrition Report',
        url: 'file:///' + url,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftSide={
          <TouchableOpacity onPress={goBackDashboard}>
            <Image
              source={ic_chevron_left_round}
              resizeMode="contain"
              style={styles.headerIconImg}
            />
          </TouchableOpacity>
        }
        body={<></>}
        rightSide={
          <TouchableOpacity
            onPress={() => {
              onShare(pdfPath || '');
            }}
          >
            <Text style={styles.headerRightText}>Share</Text>
          </TouchableOpacity>
        }
      />
      {pdfPath !== null && (
        <Pdf
          source={{
            uri: 'file:///' + pdfPath,
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

export default PdfViewScreen;
