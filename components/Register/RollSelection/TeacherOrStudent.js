import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LocalizationContext } from 'localization';
import { Colors, Constants } from 'styles';
import { roles } from 'validation';
import Icon from 'common/Icon';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { stylePropType } from 'proptypes';

const TeacherOrStudent = ({ value, setValue, style }) => {
  const { t } = useContext(LocalizationContext);
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
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.floating}>
              <Icon
                name={
                  itemValue === value
                    ? 'radio-button-checked'
                    : 'radio-button-off'
                }
                size={25}
              />
              <Text>{text}</Text>
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
