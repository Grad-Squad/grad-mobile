import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NativeModules } from 'react-native';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
console.log('🚀 ~ file: ReactotronConfig.js ~ line 9 ~ hostname', hostname);

const reactotronConfig = {
  initiate: () => {
    Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({ host: hostname })
      .useReactNative()
      .use(reactotronRedux())
      .connect();
  },
  createEnhancer: () => Reactotron.createEnhancer(),
};

export default reactotronConfig;
