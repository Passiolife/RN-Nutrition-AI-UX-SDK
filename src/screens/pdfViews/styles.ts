import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerIconImg: {
    height: 26,
    width: 24,
  },
  headerBodyTitle: {
    color: COLORS.white,
  },
  headerRightText: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 18,
    padding: 4,
    fontWeight: '400',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default styles;
