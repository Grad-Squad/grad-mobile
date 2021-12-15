import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Icon } from 'react-native-elements';
import { useStore } from 'globalStore/GlobalStore';
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

function Options({ onEdit, onDelete, contentProfileId }) {
  const anchorButton = useRef(null);
  const [visible, setVisible] = useState(false);
  const optionHandler = () => {
    setVisible((prev) => !prev);
  };

  const [store] = useStore();

  const isAuthor = store.profileId === contentProfileId;
  const authorItems = [
    {
      titleKey: 'ContextMenu/Edit',
      onPress: onEdit,
      iconName: IconNames.edit,
    },
    {
      divider: true,
      key: 'divider_edit/delete',
    },
    {
      titleKey: 'ContextMenu/Delete',
      onPress: onDelete,
      iconName: IconNames.delete,
    },
    {
      divider: true,
      key: 'divider_authorItems/Items',
    },
  ];

  const items = [
    {
      titleKey: 'ContextMenu/Share',
      onPress: () => Alert.alert('WIP'),
      iconName: IconNames.share,
    },
    {
      divider: true,
      key: 'divider_share/report',
    },
    {
      titleKey: 'ContextMenu/Report',
      onPress: () => Alert.alert('WIP'),
      iconName: IconNames.report,
    },
  ];
  if (isAuthor) {
    items.unshift(...authorItems);
  }

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
      />
    </View>
  );
}

Options.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  contentProfileId: PropTypes.number.isRequired,
};
Options.defaultProps = {};

export default Options;
