import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import SignInWithFacebook from './Facebook/SignInWithFacebook';
import SignInWithGoogle from './Google/SignInWithGoogle';

const SignInWith = ({ disabled }) => (
  <View style={[Styles.cardFooter, styles.background]}>
    <SignInWithGoogle style={styles.firstButtonGap} disabled={disabled} />
    <SignInWithFacebook disabled={disabled} />
  </View>
);

export default React.memo(SignInWith);

const styles = StyleSheet.create({
  background: {
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 17,
    alignSelf: 'center',
    top: -10,

    elevation: 2, // ! temp
  },
  firstButtonGap: { marginBottom: 10 },
});

SignInWith.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
SignInWith.defaultProps = {};
