import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Text from '../Text/Text';
import { Colors, ColorsType } from '../../utils/Colors';
import { moderateScale, scaleHeight } from '../../utils';

const AnimatedButtonComponent =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ExtraButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: React.ReactNode;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  disabled?: boolean;
}

export type AnimatedButtonProps = Omit<
  TouchableOpacityProps,
  'onPressIn' | 'onPressOut' | 'style'
> & {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export type ButtonProps = AnimatedButtonProps & ExtraButtonProps;

export const AnimatedTouchableOpacity = React.memo(
  (props: AnimatedButtonProps) => {
    const { containerStyle } = props;
    const scaleValue = useSharedValue(1);

    const animatedButtonStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scaleValue.value }],
      };
    });

    return (
      <AnimatedButtonComponent
        style={[containerStyle, animatedButtonStyle]}
        onPressIn={() => (scaleValue.value = withSpring(0.9))}
        onPressOut={() => (scaleValue.value = withSpring(1))}
        activeOpacity={0.8}
        {...props}
      >
        {props.children}
      </AnimatedButtonComponent>
    );
  }
);

export const Button = React.memo((props: ButtonProps) => {
  const {
    buttonContainerStyle,
    title,
    titleContainerStyle,
    titleStyle,
    disabled,
  } = props;

  const color = Colors;
  const styles = buttonStyles(color);

  return (
    <AnimatedTouchableOpacity
      containerStyle={[styles.buttonContainer, buttonContainerStyle]}
      {...props}
    >
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {props.leftIcon}
        <Text
          style={[
            titleStyle,
            {
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          {title}
        </Text>
        {props.rightIcon}
      </View>
    </AnimatedTouchableOpacity>
  );
});

const buttonStyles = ({ primaryColor }: ColorsType) =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: primaryColor,
      borderRadius: moderateScale(60),
      height: scaleHeight(45),
      width: '100%',
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  });
