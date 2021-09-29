import { Dimensions, StatusBar } from 'react-native';

const statusBarPadding = StatusBar.currentHeight || 0;

const Constants = {
  borderRadius: 9,
  commonMargin: Dimensions.get('window').width * 0.05,
  fromScreenStartPadding: statusBarPadding,
};

export default Constants;
