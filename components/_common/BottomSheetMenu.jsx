import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableWithoutFeedback , View } from 'react-native';
import { useLocalization } from 'localization/LocalizationProvider';
import { bottomSheetMenuItemsPropType } from 'proptypes';
import { BottomSheet, ListItem } from 'react-native-elements';
import { Icon } from './Icon';
import EduText from './EduText';

const BottomSheetMenu = ({ visible, setVisible, items }) => {
  const { t } = useLocalization();
  return (
      <BottomSheet isVisible={visible} containerStyle={styles.bottomSheetContainer} modalProps={{onRequestClose: () => setVisible(false)}}>
        <TouchableWithoutFeedback style={{flex:1, backgroundColor:'pink'}} onPress={() => setVisible(false)}>
          <View style={{flex: 1}}>
            {items.map(({ titleKey, optionStyle, onPress, iconName }) =>
              (
                <ListItem
                  key={titleKey}
                  containerStyle={styles.menuItemTitle}
                  onPress={() => {
                    onPress();
                    setVisible(false);
                  }}
                  >
                    <Icon name={iconName} color={optionStyle.color}/>
                    <EduText style={[styles.menuItemText, optionStyle]}>{t(titleKey)}</EduText>
                  </ListItem>
              ))}
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>
  );
};

BottomSheetMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  items: bottomSheetMenuItemsPropType.isRequired,
};
BottomSheetMenu.defaultProps = {
};

export default BottomSheetMenu;

const styles = StyleSheet.create({
    bottomSheetContainer:{
      flex:1,
    },
  menuItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
