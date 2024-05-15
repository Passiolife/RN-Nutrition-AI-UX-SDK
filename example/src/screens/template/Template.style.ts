import {
  Colors,
  moderateScale,
  scaleHeight,
  scaleWidth,
  scaledSize,
} from '@app/utils';
import { StyleSheet } from 'react-native';

const templateStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      flex: 1,
      marginHorizontal: scaleWidth(16),
    },
    acknowledge: {
      color: Colors.white,
      textAlign: 'center',
      fontSize: moderateScale(13),
      lineHeight: scaledSize(20),
      marginTop: scaleHeight(16),
    },
    headertText: {
      color: Colors.white,
      fontWeight: '800',
      fontSize: scaledSize(24),
    },
    templateCard: {
      borderRadius: scaledSize(6),
      paddingVertical: scaleHeight(30),
      paddingHorizontal: scaleWidth(20),
      width: '70%',
    },
    title: {
      fontSize: scaledSize(20),
      fontWeight: '600',
      color: Colors.white,
    },
    desc: {
      fontSize: scaledSize(14),
      fontWeight: '600',
      color: Colors.white,
    },

    bgImage: {
      marginVertical: scaleHeight(8),
    },
    cardbgImg: {
      borderRadius: scaledSize(8),
    },
    list: {
      marginTop: scaleHeight(16),
    },
  });

export default templateStyles;
