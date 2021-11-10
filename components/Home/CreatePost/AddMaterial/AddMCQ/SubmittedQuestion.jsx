import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, MaterialTypeIconsMap, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import ContextMenu from 'common/ContextMenu';
import { IconNames } from 'common/Icon/Icon';
import materialTypes from 'constants/materialTypes';

const SubmittedQuestion = ({ question, numOfMCQ, onEdit, onDelete }) => {
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
      <EduText style={styles.text}>{question}</EduText>
      <View>
        <View style={styles.numOfMCQ}>
          <EduText style={styles.numOfMCQTextGap}>{numOfMCQ}</EduText>
          <Icon name={MaterialTypeIconsMap[materialTypes.MCQ]} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <ContextMenu
            visible={contextMenuVisible}
            setVisible={setContextMenuVisible}
            anchor={
              <PressableIcon
                onPress={() => setContextMenuVisible(true)}
                name={IconNames.dotsHorizontal}
              />
            }
            items={contextMenuItems}
          />
        </View>
      </View>
    </View>
  );
};

SubmittedQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  numOfMCQ: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
SubmittedQuestion.defaultProps = {};

export default SubmittedQuestion;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.separator,
    borderWidth: 1,
    borderRadius: Constants.borderRadius,

    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 15,

    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  text: { fontSize: 20, flex: 1, marginLeft: 5 },
  numOfMCQ: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numOfMCQTextGap: {
    marginRight: 5,
  },
});
