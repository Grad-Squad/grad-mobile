import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'styles';

const LoadingIndicator = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ActivityIndicator color={Colors.accent} {...props} />
);

export default React.memo(LoadingIndicator);
