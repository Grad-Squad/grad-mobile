import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import LoginBack from '../_common/backgrounds/LoginBack';
import { navigationPropType } from '../../proptypes';
import { AddProfileImage, Button, TextInput } from '../_common/Input';
import { LocalizationContext } from '../../localization/LocalizationProvider';

const OptionalInfo = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const [bio, setBio] = useState('');

  const onRegisterClick = () => {
    navigation.navigate('register/rollSelection');
  };
  return (
    <LoginBack>
      <AddProfileImage
        optional
        style={styles.profileImage}
        onPress={() => {}}
      />

      <TextInput
        text={bio}
        setText={setBio}
        title={t('Register/Bio')}
        subtitle={t('TextInput/optional')}
        multiline
        style={styles.bioGap}
      />
      <Text style={styles.addLater}>
        {t('Register/You can always add them later')}
      </Text>

      <Button text={t('Register/REGISTER')} onPress={onRegisterClick} />
    </LoginBack>
  );
};

OptionalInfo.propTypes = { navigation: navigationPropType.isRequired };
OptionalInfo.defaultProps = {};

export default OptionalInfo;

const styles = StyleSheet.create({
  profileImage: { marginBottom: 10 },
  bioGap: { marginBottom: 10 },
  addLater: {
    width: '100%',
    marginBottom: 15,
    fontFamily: 'Lato_300Light',
    fontSize: 15,
  },
});
