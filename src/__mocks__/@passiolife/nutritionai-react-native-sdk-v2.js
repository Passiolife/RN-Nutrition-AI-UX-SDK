jest.mock('@passiolife/nutritionai-react-native-sdk-v3', () => {
  const mockSDK = {};
  const mockPassioIcon =
    require('../../__tests__/utils/MockPassioIcon').default;

  return {
    PassioSDK: mockSDK,
    PassioIconView: mockPassioIcon,
    IconSize: 'PX90',
  };
});
