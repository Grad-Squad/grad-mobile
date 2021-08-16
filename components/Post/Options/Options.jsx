import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import { HIT_SLOP_OBJECT } from '../../../constants';

const styles = StyleSheet.create({
  OptionsContainer: {
    alignItems: 'center',
    paddingLeft: 20,
  },
  button: {
    flexDirection: 'row',
  },
});

function Options() {
  const optionHandler = () => {
    console.log('OPTIONS');
  };

  return (
    <View style={styles.OptionsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={optionHandler}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <Icon name="options" type="simple-line-icon" />
      </TouchableOpacity>
    </View>
  );
}

export default Options;
