import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import { HIT_SLOP_OBJECT } from '../../../constants';
import ContextMenu from '../../_common/ContextMenu';
import { IconNames } from '../../_common/Icon/Icon';

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
  const anchorButton = useRef(null);
  const [visible, setVisible] = useState(false);
  const optionHandler = () => {
    setVisible((prev) => !prev);
  };

  const items = [
    {
      titleKey: 'ContextMenu/Edit',
      onPress: () => Alert.alert('WIP'),
      iconName: IconNames.edit,
    },
    {
      divider: true,
      key: 'divider1',
    },
    {
      titleKey: 'ContextMenu/Share',
      onPress: () => Alert.alert('WIP'),
      iconName: IconNames.share,
    },
    {
      divider: true,
      key: 'divider2',
    },
    {
      titleKey: 'ContextMenu/Report',
      onPress: () => Alert.alert('WIP'),
      iconName: IconNames.report,
    },
  ];

  return (
    <View style={styles.OptionsContainer}>
      <ContextMenu
        visible={visible}
        setVisible={setVisible}
        anchor={
          <TouchableOpacity
            style={styles.button}
            onPress={optionHandler}
            hitSlop={HIT_SLOP_OBJECT}
            ref={anchorButton}
          >
            <Icon name="options" type="simple-line-icon" />
          </TouchableOpacity>
        }
        items={items}
      ></ContextMenu>
    </View>
  );
}

export default Options;
