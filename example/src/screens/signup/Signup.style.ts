import {
  Colors,
  moderateScale,
  scaleHeight,
  scaleWidth,
  scaledSize,
  screenWidth,
} from '@app/utils';
import { StyleSheet } from 'react-native';

const { error, white } = Colors;

const signupStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      flex: 1,
    },
    headerText: {
      fontSize: scaledSize(30),
      fontWeight: '700',
      marginVertical: scaleHeight(16),
      textAlign: 'center',
      color: Colors.white,
    },
    errorText: {
      color: error,
      textAlign: 'center',
      marginTop: scaleHeight(8),
    },
    acknowledge: {
      color: Colors.white,
      textAlign: 'center',
      fontSize: moderateScale(13),
      lineHeight: scaledSize(20),
    },
    btn: {
      marginTop: scaleHeight(16),
      borderRadius: scaledSize(6),
    },
    btntxt: {
      color: white,
      fontSize: scaleHeight(16),
    },
    img: {
      height: scaleHeight(20),
      width: scaleWidth(20),
    },
    logo: {
      height: scaleHeight(85),
      width: screenWidth,
      alignSelf: 'center',
    },
    awareView: {
      marginHorizontal: scaleWidth(24),
      flex: 1,
    },
    underline: { textDecorationLine: 'underline' },
  });

export default signupStyles;
