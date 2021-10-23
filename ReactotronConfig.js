import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NativeModules } from 'react-native';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
console.log(hostname); // mine was 192.168.1.2

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ host: hostname })
  .useReactNative()
  .connect();
