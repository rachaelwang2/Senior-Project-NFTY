require('node-libs-react-native/globals');
const { Platform, LogBox } = require('react-native');

if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
  LogBox.ignoreLogs(
    [
      "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
      "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
    ],
  );
}

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

global.btoa = global.btoa || require('base-64').encode;
global.atob = global.atob || require('base-64').decode;

process.version = 'v9.40';

const { registerRootComponent } = require('expo');

const { default: App } = require('./frontend/App');
 
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
