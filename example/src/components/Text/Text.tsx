import React from 'react';
import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native';
interface TextProps extends React.PropsWithChildren {
  style?: StyleProp<TextStyle>;
}

const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default Text;
