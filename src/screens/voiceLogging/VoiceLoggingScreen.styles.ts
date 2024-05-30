import { StyleSheet } from 'react-native';
import type { Branding } from '../../contexts';

export const voiceLoggingScreenStyle = ({ backgroundColor }: Branding) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
    },
    bottomSheetChildrenContainer: {
      shadowColor: '#00000029',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 10,
      shadowOpacity: 1.0,
      elevation: 1,
    },
  });
