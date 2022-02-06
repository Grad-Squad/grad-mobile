import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { useLocalization } from 'localization/LocalizationProvider';
import { contextMenuItemsPropType } from 'proptypes';
import { Icon } from './Icon';
import EduText from './EduText';

const ContextMenu = ({ visible, setVisible, anchor, items }) => {
  const { t } = useLocalization();
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
            icon={() => <Icon name={iconName} />}
            title={<EduText style={styles.menuItemText}>{t(titleKey)}</EduText>}
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

const styles = StyleSheet.create({});
