import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

import { Button, Text } from '@app/components';

import { useWelcome } from './useWelcome';
import welcomeStyles from './welcome.style';

export interface WelcomeProps {}

const Welcome = () => {
  const { handlePressLogin, handlePressSignUp } = useWelcome();

  const styles = welcomeStyles();

  const logo = require('../../../assets/image/passio_logo.png');
  const bgImage = require('../../../assets/image/bg_image.png');

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="stretch" source={bgImage}>
      <SafeAreaView style={styles.bodyContainer}>
        <View>
          <Image source={logo} resizeMode="center" style={styles.logo} />
          <Text style={styles.headerText}>Themes Demo App</Text>
          <Text style={styles.acknowledge}>
            Experience and select the best{'\n'}Nutrition-AI template for your
            project.
          </Text>
        </View>
        <Pressable style={styles.actionContainer}>
          <Button
            title="Log In"
            onPress={handlePressLogin}
            titleStyle={styles.btntxt}
            buttonContainerStyle={styles.btn}
          />
          <Button
            title="Sign Up"
            onPress={handlePressSignUp}
            titleStyle={styles.btntxtWhite}
            buttonContainerStyle={styles.btnWhite}
          />
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;
