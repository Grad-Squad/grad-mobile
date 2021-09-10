import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LocalizationContext } from 'localization';
import { Colors, Constants, Fonts, Styles } from 'styles';
import { Button } from './Input';

const ContextMenu = ({
  onShareButtonPressed,
  onEditButtonPressed,
  onReportButtonPressed,
}) => {
  const { t, setLanguage } = useContext(LocalizationContext);

  const HorizontalSeparator = () => <View style={styles.horizontalSeparator} />;

  const ContextMenuButton = ({ text, onPress, icon }) => (
    <Button
      text={text}
      onPress={onPress}
      leftIcon={icon}
      transparent
      style={styles.button}
      textStyle={styles.textStyle}
    />
  );

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.container}>
        <ContextMenuButton
          text={t('ContextMenu/Edit')}
          onPress={onEditButtonPressed}
          icon={EditIcon}
        />
        <HorizontalSeparator />
        <ContextMenuButton
          text={t('ContextMenu/Share')}
          onPress={onShareButtonPressed}
          icon={ShareIcon}
        />
        <HorizontalSeparator />
        <ContextMenuButton
          text={t('ContextMenu/Report')}
          onPress={onReportButtonPressed}
          icon={ReportIcon}
        />
      </View>
    </View>
  );
};

const EditIcon = <FeatherIcons name={'edit-2'} size={25} />;
const ShareIcon = <AntDesign name={'sharealt'} size={25} />;
const ReportIcon = <AntDesign name={'flag'} size={25} />;

ContextMenu.propTypes = {
  onShareButtonPressed: PropTypes.func.isRequired,
  onEditButtonPressed: PropTypes.func.isRequired,
  onReportButtonPressed: PropTypes.func.isRequired,
};
ContextMenu.defaultProps = {};

export default ContextMenu;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    ...Styles.dropShadow,
    borderRadius: Constants.borderRadius,
  },
  button: {
    justifyContent: 'flex-start',
  },
  horizontalSeparator: {
    backgroundColor: 'white',
    height: 3,
    marginHorizontal: 8,
  },
  textStyle: {
    flexBasis: 'auto',
  },
});
