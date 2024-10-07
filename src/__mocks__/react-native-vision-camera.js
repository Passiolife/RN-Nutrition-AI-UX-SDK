const Camera = {
  takePhoto: jest.fn(),
  recordVideo: jest.fn(),
  startRecording: jest.fn(),
  stopRecording: jest.fn(),
  getAvailableCameraDevices: jest.fn().mockResolvedValue([]),
  getCameraPermissionStatus: jest.fn().mockResolvedValue('authorized'),
  requestCameraPermission: jest.fn().mockResolvedValue('authorized'),
  startPreview: jest.fn(),
  stopPreview: jest.fn(),
  // Add any other Camera methods you need in your tests
};

export { Camera };
