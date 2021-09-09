import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Constants, Styles } from 'styles';
import Icon from 'common/Icon';

const Header = () => (
  <View style={styles.wrapper}>
    <View style={{ backgroundColor: 'pink', width: 40, height: '100%' }} />

    <View style={styles.search}>
      <Icon name="search" size={20} />
      <Text style={styles.searchText}>search</Text>
    </View>

    <Icon name="bell-outline" size={28} />
  </View>
);

Header.propTypes = {};
Header.defaultProps = {};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    ...Styles.dropShadow,
    backgroundColor: Colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 23,
    paddingVertical: 15,

    borderColor: Colors.border,
    borderRadius: Constants.borderRadius,
    borderBottomWidth: 0.2,
  },
  search: {
    ...Styles.dropShadow,
    borderRadius: Constants.borderRadius,

    paddingHorizontal: 12,
    paddingVertical: 7,

    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
    marginHorizontal: 12,
  },
  searchText: {
    marginLeft: 6,
  },
});
