import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { LocalizationContext } from 'localization';
import { contextMenuItemsPropType } from 'proptypes';
import { Icon } from './Icon';
import EduText from './EduText';

const ContextMenu = ({ visible, setVisible, anchor, items }) => {
  const { t } = useContext(LocalizationContext);
  return (
    <Menu visible={visible} onDismiss={() => setVisible(false)} anchor={anchor}>
      {items.map(({ titleKey, divider, key, onPress, iconName }) => {
        if (divider) {
          return <Divider key={key} />;
        }
        return (
          <Menu.Item
            key={titleKey}
            onPress={() => {
              onPress();
              setVisible(false);
            }}
            title={
              <View style={styles.menuItemTitle}>
                <Icon name={iconName} />
                <EduText style={styles.menuItemText}>{t(titleKey)}</EduText>
              </View>
            }
          />
        );
      })}
    </Menu>
  );
};

ContextMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  anchor: PropTypes.node.isRequired,
  items: contextMenuItemsPropType.isRequired,
};
ContextMenu.defaultProps = {};

export default ContextMenu;

const styles = StyleSheet.create({
  menuItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
