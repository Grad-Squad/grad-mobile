import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants, Styles } from 'styles';
import { childrenPropType, stylePropType } from 'proptypes';
import Page from 'common/Page/Page';
import Logo from 'common/Logo/Logo';

const LoginBack = ({
  children,
  componentAfterBackground,
  style,
  pageStyle,
  bodyStyle,
}) => (
  <Page style={[styles.wrapper, pageStyle]}>
    <View style={styles.content}>
      <View style={[Styles.cardBody, styles.mainContent, style]}>
        <Logo hasBoundingCircle style={styles.logo} />
        <View style={[styles.body, bodyStyle]}>{children}</View>
      </View>
      {componentAfterBackground}
    </View>
  </Page>
);

LoginBack.propTypes = {
  children: childrenPropType.isRequired,
  componentAfterBackground: childrenPropType,
  style: stylePropType,
  pageStyle: stylePropType,
  bodyStyle: stylePropType,
};
LoginBack.defaultProps = {
  componentAfterBackground: <></>,
  pageStyle: {},
  bodyStyle: {},
  style: {},
};
export default LoginBack;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: Constants.fromScreenStartPadding,
  },
  content: {
    width: '85%',
  },
  mainContent: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 28,
  },
  logo: {
    position: 'absolute',
    top: -25,
  },
  body: {
    marginTop: 50,
    marginBottom: 17,
    alignItems: 'center',
  },
});
