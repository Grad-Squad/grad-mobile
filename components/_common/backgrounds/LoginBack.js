import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { Styles } from '../../../styles';
import Logo from '../Logo/Logo';
import Page from '../Page/Page';
import { childrenPropType } from '../../../proptypes';

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
  style: ViewPropTypes.style,
  pageStyle: ViewPropTypes.style,
  bodyStyle: ViewPropTypes.style,
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
  },
});
