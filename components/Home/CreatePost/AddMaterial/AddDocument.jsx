import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Styles } from 'styles';
import { iconNamesPropType } from 'common/Icon/Icon';

const AddDocument = ({ onAddPress, error, iconName }) => (
  <View style={styles.addDocumentIcon}>
    <PressableIcon
      name={iconName}
      size={90}
      onPress={onAddPress}
      color={Colors.accent}
    />
    {error && (
      <EduText style={[Styles.errorText, styles.error]}> {error}</EduText>
    )}
  </View>
);

AddDocument.propTypes = {
  onAddPress: PropTypes.func.isRequired,
  error: PropTypes.string,
  iconName: iconNamesPropType.isRequired,
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
