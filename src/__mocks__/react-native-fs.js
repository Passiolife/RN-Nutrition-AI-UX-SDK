const RNFS = {
  readDir: jest.fn().mockResolvedValue([]), // Mocked function to read a directory
  stat: jest
    .fn()
    .mockResolvedValue({ isFile: () => true, isDirectory: () => false }), // Mocked file stat method
  readFile: jest.fn().mockResolvedValue('mocked file content'), // Mocked method to read file content
  writeFile: jest.fn().mockResolvedValue(null), // Mocked method to write to a file
  unlink: jest.fn().mockResolvedValue(null), // Mocked method to delete a file
  exists: jest.fn().mockResolvedValue(true), // Mocked method to check if a file exists
  mkdir: jest.fn().mockResolvedValue(null), // Mocked method to create a directory
  downloadFile: jest.fn().mockReturnValue({
    promise: Promise.resolve({
      jobId: 1,
      statusCode: 200,
      bytesWritten: 1024,
    }),
  }), // Mock download file function
  DocumentDirectoryPath: '/mocked/document/directory', // Mocked path for the document directory
  // Add other methods from react-native-fs that are needed in your tests
};

export default RNFS;
