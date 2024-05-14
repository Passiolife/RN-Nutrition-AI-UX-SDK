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

import signupStyles from './Signup.style';
import { useSignUp } from './useSignUp';

export interface SignUpScreenProps {}

const SignUpScreen = () => {
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
  } = useSignUp();

  const styles = signupStyles();

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
            <Text style={styles.headerText}>Sign Up</Text>
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
              buttonContainerStyle={styles.btn}
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
            <Text style={styles.acknowledge}>
              By signing up, you acknowledge that your have read{'\n'}the&nbsp;
              <Text style={[styles.acknowledge, styles.underline]}>
                Privacy Policy
              </Text>
              &nbsp;and agree to the&nbsp;
              <Text style={[styles.acknowledge, styles.underline]}>
                Terms of Service.
              </Text>
            </Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpScreen;
