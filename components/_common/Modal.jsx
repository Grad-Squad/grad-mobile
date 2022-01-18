import React from 'react';
import { Modal as ReactNativeModal, StyleSheet, View } from 'react-native';
import { childrenPropType } from 'proptypes';
import { Colors, Constants } from 'styles';

const Modal = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ReactNativeModal animationType="slide" transparent {...props}>
    <View style={styles.centeredView}>
      <View style={styles.backgroundView}>{children}</View>
    </View>
  </ReactNativeModal>
);

Modal.propTypes = {
  children: childrenPropType.isRequired,
};
Modal.defaultProps = {};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.modalBackdrop,
  },
  backgroundView: {
    borderRadius: Constants.borderRadius,
    backgroundColor: Colors.background,
    width: '90%',
    padding: 15,
  },
});
