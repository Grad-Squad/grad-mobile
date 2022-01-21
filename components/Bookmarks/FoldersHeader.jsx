import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

const FoldersHeader = ({ onAddFolderPress, hideAdd }) => {
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <EduText>{t('BookmarksList/Folders')}</EduText>
      {!hideAdd && (
        <PressableIcon onPress={onAddFolderPress} name={IconNames.add} siz />
      )}
    </View>
  );
};

FoldersHeader.propTypes = {
  onAddFolderPress: PropTypes.func,
  hideAdd: PropTypes.bool,
};
FoldersHeader.defaultProps = {
  onAddFolderPress: undefined,
  hideAdd: false,
};

export default FoldersHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: Constants.commonMargin,
  },
});
