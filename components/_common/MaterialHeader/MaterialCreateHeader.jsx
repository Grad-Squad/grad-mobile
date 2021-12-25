import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { TransparentButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import MaterialHeader from './MaterialHeader';

const MaterialCreateHeader = ({
  title,
  rightButtonText,
  onPress,
  onBackPress,
  rightButtonProps,
}) => (
  <MaterialHeader
    titleComponent={<EduText style={styles.text}>{title}</EduText>}
    rightComponent={
      <TransparentButton
        text={rightButtonText}
        onPress={onPress}
        textStyle={styles.postButtonText}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rightButtonProps}
      />
    }
    onBackPress={onBackPress}
  />
);

MaterialCreateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
  rightButtonProps: PropTypes.shape({}),
};
MaterialCreateHeader.defaultProps = {
  rightButtonProps: {},
};

export default MaterialCreateHeader;

const styles = StyleSheet.create({
  postButtonText: {
    fontSize: 19,
  },
  text: {
    fontSize: 24,
    marginHorizontal: 7,
  },
});
