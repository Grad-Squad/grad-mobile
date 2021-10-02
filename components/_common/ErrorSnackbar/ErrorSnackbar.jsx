import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Colors } from 'styles';
import { LocalizationContext } from 'localization';
import EduText from 'common/EduText';

const ErrorSnackbar = ({ visible, setVisible, error }) => {
  const { t } = useContext(LocalizationContext);
  return (
    <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
      <EduText style={styles.text}>
        <EduText style={styles.errorWord}>{t('Error: ')} </EduText>
        {error}
      </EduText>
    </Snackbar>
  );
};

ErrorSnackbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  error: PropTypes.string,
};
ErrorSnackbar.defaultProps = { error: undefined };

export default React.memo(ErrorSnackbar);

const styles = StyleSheet.create({
  text: { color: Colors.white },
  errorWord: {
    color: Colors.error,
  },
});
