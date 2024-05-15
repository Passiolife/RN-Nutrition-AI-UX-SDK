import {
  Colors,
  moderateScale,
  scaleHeight,
  scaleWidth,
  scaledSize,
  screenWidth,
} from '@app/utils';
import { StyleSheet } from 'react-native';

const templateDetailsStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      flex: 1,
      paddingHorizontal: scaleWidth(16),
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
    templateDetailsCard: {
      padding: scaleWidth(16),
      marginHorizontal: scaleWidth(16),
    },
    title: {
      fontSize: scaledSize(16),
      fontWeight: '800',
      color: Colors.white,
    },
    desc: {
      fontSize: scaledSize(12),
      fontWeight: '500',
      color: Colors.white,
    },
    btnTitle: {
      fontSize: scaledSize(14),
      fontWeight: '400',
      color: Colors.white,
    },
    listDesc: {
      fontSize: scaledSize(16),
      fontWeight: '400',
      color: Colors.white,
    },
    bgImage: {
      height: screenWidth / 2,
      shadowColor: Colors.black,
      shadowRadius: 4,
      shadowOpacity: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingHorizontal: scaleWidth(16),
    },
    cardbgImg: {
      borderBottomRightRadius: scaledSize(32),
      borderBottomLeftRadius: scaledSize(32),
    },
    list: {
      backgroundColor: Colors.primaryColor30,
      borderRadius: scaledSize(12),
      marginHorizontal: scaleWidth(16),
    },
    templateCard: {
      borderRadius: scaledSize(6),
      paddingVertical: scaleHeight(30),
      width: '70%',
    },
    keyHeader: {
      fontSize: scaledSize(18),
      fontWeight: '600',
      color: Colors.white,
      marginTop: scaleHeight(16),
      marginBottom: scaleHeight(8),
      paddingHorizontal: scaleWidth(16),
    },
    back: {
      height: scaledSize(24),
      width: scaledSize(24),
      marginBottom: scaleHeight(24),
    },
    seperator: {
      borderWidth: 0.4,
      marginHorizontal: scaleWidth(16),
      borderColor: Colors.whiteOpacity20,
    },
    bottomBtn: {
      marginBottom: scaleHeight(48),
      borderRadius: scaledSize(6),
      marginHorizontal: 16,
      width: '90%',
    },
    containerStyle: {
      paddingHorizontal: scaleWidth(16),
    },
    mainContainer: { flex: 1 },
  });

export default templateDetailsStyles;
