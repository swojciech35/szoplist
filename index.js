/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '808189868500-a6ee5k023l90fpc7jdembcu8t4t19fv4.apps.googleusercontent.com',
  });
AppRegistry.registerComponent(appName, () => App);
