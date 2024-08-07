import React from 'react';
import PropTypes from 'prop-types';
import { useLocalization } from 'localization';
import { roles } from 'validation';
import { Pressable, View, StyleSheet } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import EduText from 'common/EduText';
import { Icon } from 'common/Icon';
import { stylePropType } from 'proptypes';
import { Colors, Constants } from 'styles';
import { IconNames } from 'common/Icon/Icon';

const TeacherOrStudent = ({ value, setValue, style }) => {
  const { t } = useLocalization();
  const items = [
    [roles.student, t('Register/Student'), t('Register/Student Emoji')],
    [roles.teacher, t('Register/Teacher'), t('Register/Teacher Emoji')],
  ];
  return (
    <View style={[styles.wrapper, style]}>
      {items.map((item) => {
        const [itemValue, text, emoji] = item;
        return (
          <Pressable
            onPress={() => setValue(itemValue)}
            key={itemValue}
            style={styles.radioButton}
            android_ripple={pressableAndroidRipple}
          >
            <EduText style={styles.emoji}>{emoji}</EduText>
            <View style={styles.floating}>
              <Icon
                name={
                  itemValue === value
                    ? IconNames.radioButtonChecked
                    : IconNames.radioButtonOff
                }
                size={25}
              />
              <EduText>{text}</EduText>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

TeacherOrStudent.propTypes = {
  style: stylePropType,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
TeacherOrStudent.defaultProps = {
  style: {},
};

export default TeacherOrStudent;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  radioButton: {
    width: 130,
    height: 130,

    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: Constants.borderRadius,

    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 32 },
  floating: {
    position: 'absolute',
    bottom: 5,
    left: 5,

    flexDirection: 'row',
    alignItems: 'center',
  },
});
