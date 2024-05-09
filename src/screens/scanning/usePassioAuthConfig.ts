import { useEffect, useState } from 'react';

import { PassioSDK } from '@passiolife/nutritionai-react-native-sdk-v3/src/sdk/v2';
import { PASSIO_SDK_KEY } from '../../key'; // create key.ts folder at root

export function usePassioAuthConfig() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function getAuth() {
      const isAuthorized = await PassioSDK.requestCameraAuthorization();
      const passioSDKStatus = await PassioSDK.configure({
        key: PASSIO_SDK_KEY,
        autoUpdate: true,
        debugMode: true,
      });

      setIsReady(
        isAuthorized && passioSDKStatus.mode === 'isReadyForDetection'
      );
    }

    getAuth();
  }, []);

  return {
    isReady,
  };
}
