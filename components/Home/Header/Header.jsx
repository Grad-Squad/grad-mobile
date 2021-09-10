import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { Colors, Constants, Styles } from 'styles';

const Header = () => (
  <View style={styles.wrapper}>
    <View style={{ backgroundColor: 'pink', width: 40, height: '100%' }} />

    <View style={styles.search}>
      <Octicons name="search" color={Colors.offBlack} size={20} />
      <Text style={styles.searchText}>search</Text>
    </View>

    <MaterialCommunityIcons
      name="bell-outline"
      color={Colors.offBlack}
      size={28}
    />
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
