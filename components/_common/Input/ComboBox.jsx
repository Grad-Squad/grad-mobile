import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from 'styles';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';

const ComboBox = ({
  placeholder,
  value,
  setValueCallback,
  initialItems,
  multiple,
  min,
  max,
  error,
  errorMsg,
}) => {
  const { t } = useContext(LocalizationContext);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValueCallback}
      setItems={setItems}
      multiple={multiple}
      min={min}
      max={max}
      mode="BADGE"
      showBadgeDot={false}
      style={[styles.picker, error && styles.pickerError]}
      placeholder={
        <EduText style={error && styles.textStyleError}>
          {placeholder} {error && errorMsg}
        </EduText>
      }
      textStyle={styles.textStyle}
      searchable
      translation={{
        SEARCH_PLACEHOLDER: t('DropDown/Search...'),
      }}
      searchContainerStyle={{
        borderBottomColor: Colors.separator,
      }}
      searchTextInputStyle={{
        borderWidth: 0,
      }}
      listMode="MODAL"
    />
  );
};

ComboBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setValueCallback: PropTypes.func.isRequired,
  initialItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};
ComboBox.defaultProps = {
  value: null,
  multiple: false,
  min: 0,
  max: 1,
  error: false,
  errorMsg: '',
};

export default ComboBox;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    marginLeft: 3,
  },
  textStyleError: {
    color: Colors.error,
  },
  picker: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    borderColor: Colors.separator,
  },
  pickerError: {
    borderColor: Colors.error,
  },
});
