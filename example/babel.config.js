const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
          '@app/components': '../example/src/components',
          '@app/screens': '../example/src/screens',
          '@app/assets': '../example/assets',
          '@app/utils': ['../example/src/utils'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
