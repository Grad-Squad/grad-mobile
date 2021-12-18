import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import Checkbox from 'common/Input/Checkbox';

const MaterialItem = ({ title, amount, type, onPress, onLongPress }) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    android_ripple={pressableAndroidRipple}
    style={styles.materialItem}
  >
    <EduText style={styles.materialItemTitle} numberOfLines={2}>
      {title}
    </EduText>
    <View style={styles.rightArea}>
      <EduText style={styles.materialItemAmount}>{amount}x</EduText>
      <Icon name={MaterialTypeIconsMap[type]} size={34} />
    </View>
  </Pressable>
);

export const MaterialItemWithCheckBox = ({
  title,
  amount,
  type,
  onPress,
  onLongPress,
  isSelected,
  isSelectionEnabled,
}) => {
  const materialItem = (
    <MaterialItem
      title={title}
      amount={amount}
      type={type}
      onPress={onPress}
      onLongPress={onLongPress || null}
      isSelected={isSelected}
      isSelectionEnabled={isSelectionEnabled}
    />
  );
  return (
    <View style={styles.row}>
      {isSelectionEnabled && (
        <Checkbox
          checked={isSelected}
          onPress={onLongPress}
          pressableProps={{
            style: styles.checkbox,
          }}
        />
      )}
      {materialItem}
    </View>
  );
};

const commonPropTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
};
MaterialItem.defaultProps = { onLongPress: null };
MaterialItem.propTypes = commonPropTypes;
MaterialItemWithCheckBox.propTypes = {
  ...commonPropTypes,
  isSelected: PropTypes.bool.isRequired,
  isSelectionEnabled: PropTypes.bool.isRequired,
};
MaterialItemWithCheckBox.defaultProps = MaterialItem.defaultProps;

export default React.memo(MaterialItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: Constants.commonMargin / 2,
  },
  materialItem: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius,
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  materialItemTitle: {
    color: Colors.black,
    fontSize: 20,

    flexWrap: 'wrap',

    marginRight: 10,
  },
  rightArea: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'flex-end',
  },
  materialItemAmount: {
    color: Colors.black,
    fontSize: 18,

    marginRight: 5,
  },
});
