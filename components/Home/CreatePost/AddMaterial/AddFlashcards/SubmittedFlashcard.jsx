import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import ContextMenu from 'common/ContextMenu';
import { IconNames } from 'common/Icon/Icon';
import { flashcardAddPropType } from 'proptypes';
import ResponsiveImage from 'common/ResponsiveImage';

const SubmittedFlashcard = ({ flashcard, onEdit, onDelete }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const contextMenuItems = [
    {
      titleKey: 'ContextMenu/Edit',
      onPress: onEdit,
      iconName: IconNames.edit,
    },
    { divider: true, key: 'divider' },
    {
      titleKey: 'ContextMenu/Delete',
      onPress: onDelete,
      iconName: IconNames.delete,
    },
  ];
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        {!!flashcard?.frontText && (
          <EduText style={styles.text} numberOfLines={3}>
            {flashcard.frontText}
          </EduText>
        )}
        {flashcard?.frontImage?.file && (
          <ResponsiveImage
            imageURI={flashcard?.frontImage?.file?.uri}
            maxWidthRatio={0.2}
          />
        )}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <ContextMenu
          visible={contextMenuVisible}
          setVisible={setContextMenuVisible}
          anchor={
            <PressableIcon
              onPress={() => setContextMenuVisible(true)}
              name={IconNames.dotsVertical}
            />
          }
          items={contextMenuItems}
        />
      </View>
    </View>
  );
};

SubmittedFlashcard.propTypes = {
  flashcard: flashcardAddPropType.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
SubmittedFlashcard.defaultProps = {};

export default SubmittedFlashcard;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.separator,
    borderWidth: 1,
    borderRadius: Constants.borderRadius,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 15,

    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  text: { fontSize: 20, flex: 1, marginHorizontal: 5 },
});
