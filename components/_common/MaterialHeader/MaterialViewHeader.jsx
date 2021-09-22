import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PressableIcon } from 'common/Icon';
import { View, StyleSheet } from 'react-native';
import EduText from 'common/EduText';
import ContextMenu from 'common/ContextMenu';
import { contextMenuItemsPropType } from 'proptypes';
import MaterialHeader from './MaterialHeader';

const MaterialViewHeader = ({
  author,
  title,
  contextMenuItems,
  onBackPress,
}) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  return (
    <MaterialHeader
      titleComponent={
        <View style={styles.titleComponent}>
          <EduText style={styles.author}>{author}</EduText>
          <EduText style={styles.title}>{title}</EduText>
        </View>
      }
      rightComponent={
        <ContextMenu
          visible={contextMenuVisible}
          setVisible={setContextMenuVisible}
          anchor={
            <PressableIcon
              name="dots-vertical"
              onPress={() => setContextMenuVisible(true)}
              size={28}
            />
          }
          items={contextMenuItems}
        />
      }
      onBackPress={onBackPress}
    />
  );
};

MaterialViewHeader.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contextMenuItems: contextMenuItemsPropType.isRequired,
  onBackPress: PropTypes.func.isRequired,
};
MaterialViewHeader.defaultProps = {};

export default MaterialViewHeader;

const styles = StyleSheet.create({
  titleComponent: {
    marginLeft: 8,
  },
  author: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
  },
});
