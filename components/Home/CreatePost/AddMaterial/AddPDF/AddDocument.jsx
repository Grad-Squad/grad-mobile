import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

const AddDocument = ({ onAddPress }) => (
  <View style={styles.addDocumentIcon}>
    <PressableIcon
      name={IconNames.addDocument}
      size={90}
      onPress={onAddPress}
    />
  </View>
);

AddDocument.propTypes = { onAddPress: PropTypes.func.isRequired };
AddDocument.defaultProps = {};

export default AddDocument;

const styles = StyleSheet.create({
  addDocumentIcon: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
