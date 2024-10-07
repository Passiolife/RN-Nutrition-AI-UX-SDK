const Voice = {
  onSpeechStart: jest.fn(),
  onSpeechEnd: jest.fn(),
  onSpeechResults: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  destroy: jest.fn(),
  // Add any other methods that you use from this module
};

export default Voice;
