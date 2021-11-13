import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import EduText from 'common/EduText';
import { Styles } from 'styles';

const AddDocument = ({ onAddPress, error }) => (
  <View style={styles.addDocumentIcon}>
    <PressableIcon
      name={IconNames.addDocument}
      size={90}
      onPress={onAddPress}
    />
    {error && (
      <EduText style={[Styles.errorText, styles.error]}> {error}</EduText>
    )}
  </View>
);

AddDocument.propTypes = {
  onAddPress: PropTypes.func.isRequired,
  error: PropTypes.string,
};
AddDocument.defaultProps = { error: undefined };

export default AddDocument;

const styles = StyleSheet.create({
  addDocumentIcon: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 5,
  },
});
