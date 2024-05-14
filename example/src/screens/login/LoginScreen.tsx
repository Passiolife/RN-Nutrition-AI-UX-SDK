import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

import { Button, Text, TextInput } from '@app/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import loginStyles from './LoginScreen.style';
import { useLogin } from './useLogin';

export interface LoginScreenProps {}

const LoginScreen = () => {
  const {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    isEmailValid,
    isPasswordValid,
    screenH,
    onKeyboardWillshow,
    onKeyboardWillHide,
  } = useLogin();

  const styles = loginStyles();

  const logo = require('../../../assets/image/passio_logo.png');
  const bgImage = require('../../../assets/image/bg_image.png');
  const lock = require('../../../assets/image/lock.png');
  const profile = require('../../../assets/image/profile.png');

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="stretch" source={bgImage}>
      <SafeAreaView style={styles.bodyContainer}>
        <KeyboardAwareScrollView
          style={styles.awareView}
          contentContainerStyle={{
            justifyContent: 'space-between',
            height: screenH,
          }}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          onKeyboardWillShow={(frames: any) => onKeyboardWillshow(frames)}
          onKeyboardWillHide={onKeyboardWillHide}
        >
          <View>
            <Image source={logo} resizeMode="center" style={styles.logo} />
            <Text style={styles.headerText}>Login</Text>
            <TextInput
              placeholder="Email address"
              icon={
                <Image
                  source={profile}
                  resizeMode="center"
                  style={styles.img}
                />
              }
              isError={isEmailValid}
              value={email}
              onChangeText={(val) => handleChangeEmail(val)}
            />
            <TextInput
              placeholder="Password"
              icon={
                <Image source={lock} resizeMode="center" style={styles.img} />
              }
              isSecureMode
              isError={isPasswordValid}
              value={password}
              onChangeText={(val) => handleChangePassword(val)}
            />
            <Button
              title="Log In"
              titleStyle={styles.btntxt}
              disabled={!email || !password}
              buttonContainerStyle={
                !email || !password ? styles.disableBtn : styles.btn
              }
            />
            <Text style={styles.errorText}>
              {!isEmailValid && !isPasswordValid
                ? 'You must enter valid email and password'
                : !isEmailValid
                  ? 'You must enter a valid email address.'
                  : !isPasswordValid
                    ? 'You must enter a valid password.'
                    : null}
            </Text>
          </View>
          <Pressable>
            <Text style={styles.forgotPwd}>Forgot your password?</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
