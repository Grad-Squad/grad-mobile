import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';

const MaterialItem = ({ title, amount, type }) => (
  <View style={styles.materialItem}>
    <EduText style={styles.materialItemTitle} numberOfLines={2}>
      {title}
    </EduText>
    <View style={styles.rightArea}>
      <EduText style={styles.materialItemAmount}>{amount}x</EduText>
      <Icon name={MaterialTypeIconsMap[type]} size={34} />
    </View>
  </View>
);

MaterialItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
MaterialItem.defaultProps = {};

export default MaterialItem;

const styles = StyleSheet.create({
  materialItem: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius,

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

    flex: 1,
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
