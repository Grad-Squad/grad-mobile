import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from '../../../styles';
import Logo from '../Logo/Logo';
import Page from '../Page/Page';
import { childrenPropType } from '../../../proptypes';

const LoginBack = ({ children, componentAfterBackground }) => (
  <Page style={styles.wrapper}>
    <View style={styles.content}>
      <View style={[Styles.cardBody, styles.mainContent]}>
        <Logo hasBoundingCircle style={styles.logo} />
        {children}
      </View>
      {componentAfterBackground}
    </View>
  </Page>
);

LoginBack.propTypes = {
  children: childrenPropType.isRequired,
  componentAfterBackground: childrenPropType,
};
LoginBack.defaultProps = { componentAfterBackground: <></> };
export default LoginBack;

const styles = StyleSheet.create({
  mainContent: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 28,
  },
  logo: {
    position: 'absolute',
    top: -25,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '85%',
  },
});
