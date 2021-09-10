import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import PressableIcon from 'common/PressableIcon';
import { LocalizationContext } from 'localization';
import RegularText from 'common/Text/RegularText';
import { Colors, Styles } from 'styles';
import { TransparentButton } from 'common/Input/Button';

const CreatePostHeader = ({ onBackPress, onPostPress }) => {
  const { t, isRTL } = useContext(LocalizationContext);
  return (
    <View style={styles.wrapper}>
      <PressableIcon name="close" onPress={onBackPress} size={28} />
      <RegularText style={[styles.text, isRTL && styles.textRTL]}>
        {t('CreatePost/Create New Post')}
      </RegularText>
      <TransparentButton
        text={t('CreatePost/Post')}
        onPress={onPostPress}
        style={[!isRTL && styles.postButtonRTL]}
        textStyle={styles.postButton}
      />
    </View>
  );
};

CreatePostHeader.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onPostPress: PropTypes.func.isRequired,
};
CreatePostHeader.defaultProps = {};

export default CreatePostHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 8,
    paddingHorizontal: 15,

    backgroundColor: Colors.foreground,
    ...Styles.bottomBorder,
  },
  text: {
    fontSize: 24,
    marginHorizontal: 7,
  },
  textRTL: {
    marginLeft: 'auto',
  },
  postButtonRTL: {
    marginLeft: 'auto',
  },
  postButton: {
    fontSize: 19
  },
});
