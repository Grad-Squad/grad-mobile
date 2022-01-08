import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Constants, Styles } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import NoInternetConnectionText from 'common/NoInternetConnectionText';

const Header = () => (
  <>
    <View style={styles.wrapper}>
      <View style={{ backgroundColor: 'pink', width: 40, height: '100%' }} />
      <View style={styles.search}>
        <Icon name={IconNames.search} size={20} />
        <EduText style={styles.searchText}>search</EduText>
      </View>

      <Icon name={IconNames.bell} size={28} />
    </View>
    <NoInternetConnectionText />
  </>
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
    paddingBottom: 15,
    paddingTop: 8 + Constants.fromScreenStartPadding,

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
