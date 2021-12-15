import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import BottomSheetMenu from 'common/BottomSheetMenu';
import { Colors } from 'styles';
import { IconNames } from '../_common/Icon/Icon';

function ProfilePictureOptions({
  onDelete,
  onEdit,
  visible,
  setVisible
}) {

  const items = [
    {
      titleKey: 'PictureBottomSheetMenu/Edit',
      optionStyle: {},
      onPress: onEdit,
      iconName: IconNames.edit,
    },
    {
      titleKey: 'PictureBottomSheetMenu/Delete',
      optionStyle: {
        color: Colors.removalWarning,
      },
      onPress: onDelete,
      iconName: IconNames.removeImage,
    },
  ];

  return (
    <View>
        <BottomSheetMenu
          visible={visible}
          setVisible={setVisible}
          items={items}
        />
    </View>
  );
}

ProfilePictureOptions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
ProfilePictureOptions.defaultProps = {
};

export default ProfilePictureOptions;
