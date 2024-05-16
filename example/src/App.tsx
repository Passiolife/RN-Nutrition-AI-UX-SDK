import React from 'react';
import services from './services';
import {
  BrandingProvider,
  NutritionNavigator,
  ServicesProvider,
  usePassioConfig,
} from 'react-native-nutrition-ux';
import branding from './branding';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './SplashScreen';
import { PASSIO_SDK_KEY } from '../config';

export default function App() {
  const { isReady } = usePassioConfig({ key: PASSIO_SDK_KEY });

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <ServicesProvider services={services}>
      <BrandingProvider branding={branding}>
        <NavigationContainer>
          <NutritionNavigator />
        </NavigationContainer>
      </BrandingProvider>
    </ServicesProvider>
  );
}
