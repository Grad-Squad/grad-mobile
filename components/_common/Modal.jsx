import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactNativeModal, StyleSheet, View } from 'react-native';
import { childrenPropType, stylePropType } from 'proptypes';
import { Colors, Constants } from 'styles';

const Modal = ({
  children,
  hasBasicBackground,
  contentContainerStyle,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ReactNativeModal animationType="slide" transparent {...props}>
    <View style={[styles.centeredView, contentContainerStyle]}>
      <View
        style={
          hasBasicBackground
            ? styles.basicBackgroundView
            : styles.backgroundView
        }
      >
        {children}
      </View>
    </View>
  </ReactNativeModal>
);

Modal.propTypes = {
  children: childrenPropType.isRequired,
  contentContainerStyle: stylePropType,
  hasBasicBackground: PropTypes.bool,
};
Modal.defaultProps = {
  contentContainerStyle: {},
  hasBasicBackground: false,
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.modalBackdrop,
  },
  basicBackgroundView: {
    backgroundColor: Colors.background,
    width: '100%',
    padding: 15,
  },
  backgroundView: {
    borderRadius: Constants.borderRadius,
    backgroundColor: Colors.background,
    width: '90%',
    padding: 15,
  },
});
