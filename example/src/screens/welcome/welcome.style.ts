import {
  Colors,
  moderateScale,
  scaleHeight,
  scaleWidth,
  scaledSize,
  screenWidth,
} from '@app/utils';
import { StyleSheet } from 'react-native';

const { error, white, primaryColor } = Colors;

const welcomeStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: scaledSize(30),
      fontWeight: '700',
      marginVertical: scaleHeight(16),
      textAlign: 'center',
      color: white,
    },
    acknowledge: {
      color: white,
      textAlign: 'center',
      fontSize: moderateScale(13),
      lineHeight: scaledSize(20),
    },
    btn: {
      marginTop: scaleHeight(16),
      borderRadius: scaledSize(6),
    },
    btnWhite: {
      marginTop: scaleHeight(16),
      borderRadius: scaledSize(6),
      backgroundColor: white,
    },
    btntxt: {
      color: white,
      fontSize: scaleHeight(16),
    },
    btntxtWhite: {
      fontSize: scaleHeight(16),
      color: primaryColor,
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
    actionContainer: {
      paddingHorizontal: scaleWidth(16),
      marginBottom: scaleHeight(36),
    },
  });

export default welcomeStyles;
