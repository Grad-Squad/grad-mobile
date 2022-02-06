import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import EduText from 'common/EduText';
import Checkbox from 'common/Input/Checkbox';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Colors, Constants } from 'styles';

const ModalReviewCheckbox = ({ text, setChecked, checked, disabled }) => (
  <Pressable
    style={styles.row}
    onPress={() => setChecked((state) => !state)}
    android_ripple={pressableAndroidRipple}
    disabled={disabled}
  >
    <Checkbox
      checked={checked}
      setChecked={setChecked}
      disabled={disabled}
      pressableProps={{
        disabled,
      }}
    />
    <EduText style={[disabled && styles.disabledText, styles.reviewOption]}>
      {text}
    </EduText>
  </Pressable>
);

ModalReviewCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
ModalReviewCheckbox.defaultProps = {};

export default ModalReviewCheckbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledText: {
    color: Colors.disabledButton,
  },
  reviewOption: {
    fontSize: 20,
    paddingVertical: Constants.commonMargin / 3,
    paddingHorizontal: Constants.commonMargin,
  },
});
