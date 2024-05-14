import { Colors, scaleHeight, scaleWidth, scaledSize } from '@app/utils';
import React, {
  forwardRef,
  useState,
  type ForwardRefRenderFunction,
  type Ref,
} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

interface TextInputWithIconProps extends TextInputProps {
  icon?: JSX.Element;
  isSecureMode?: boolean;
  isError?: boolean;
  isFocused?: boolean;
}

const TextInputWithIcon: ForwardRefRenderFunction<
  TextInput,
  TextInputWithIconProps
> = (
  { icon, isSecureMode, isError, isFocused, ...props }: TextInputWithIconProps,
  ref: Ref<TextInput>
) => {
  const eye = require('../../../assets/image/eye.png');
  const eye_closed = require('../../../assets/image/eye_closed.png');
  const [secureText, setSecureText] = useState(false);
  const [focusable, setFocusable] = useState(isFocused);

  const onPressSecure = () => {
    setSecureText((prev) => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        focusable && styles.focus,
        isError ? styles.container : [styles.container, styles.error],
      ]}
    >
      {icon && <View>{icon}</View>}
      <TextInput
        ref={ref}
        style={styles.input}
        placeholderTextColor={Colors.white}
        {...props}
        onFocus={() => {
          setFocusable(true);
        }}
        onBlur={() => {
          setFocusable(false);
        }}
        secureTextEntry={secureText}
      />
      {isSecureMode && (
        <Pressable onPress={onPressSecure}>
          {secureText ? (
            <Image
              source={eye_closed}
              resizeMode="contain"
              style={styles.img}
            />
          ) : (
            <Image source={eye} resizeMode="contain" style={styles.img} />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteOpacity20,
    borderRadius: scaledSize(6),
    padding: scaledSize(16),
    marginVertical: scaleHeight(8),
  },
  error: {
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: scaledSize(6),
  },
  input: {
    flex: 1,
    marginLeft: scaleWidth(8),
    fontSize: scaledSize(16),
    color: Colors.white,
  },
  icon: {
    marginRight: 10,
  },
  focus: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: scaledSize(6),
  },
  img: {
    height: scaleHeight(20),
    width: scaleWidth(20),
  },
});

export default forwardRef(TextInputWithIcon);
