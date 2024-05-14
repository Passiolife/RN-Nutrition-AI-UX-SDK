import {
  Colors,
  scaleHeight,
  scaleWidth,
  scaledSize,
  screenWidth,
} from '@app/utils';
import { StyleSheet } from 'react-native';

const { error, white } = Colors;

const loginStyles = () =>
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
    forgotPwd: {
      color: Colors.white,
      textDecorationLine: 'underline',
      textAlign: 'center',
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
  });

export default loginStyles;
