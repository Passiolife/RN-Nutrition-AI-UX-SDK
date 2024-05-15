import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const headerStyle = () =>
  StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statusBar: {
      height: getStatusBarHeight(),
    },
    sideBar: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgBgStyle: {
      borderRadius: 0,
      backgroundColor: 'transparent',
    },
    headerBottom: {
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default headerStyle;
