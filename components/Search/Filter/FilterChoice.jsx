import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from 'common/Icon';
import EduText from 'common/EduText';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Colors, Constants } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setParam } from 'globalStore/searchSlice';
import { useLocalization } from 'localization';
import { mapChoiceToValue, mapParentToKey } from './filterMaps';

const FilterChoice = ({ text, parent }) => {
  const dispatch = useDispatch();
  const { t } = useLocalization();
  const searchParams = useSelector((state) => state.search.params);
  return (
    <Pressable
      onPress={() =>
        dispatch(
          setParam({
            value: mapChoiceToValue[text],
            key: mapParentToKey[parent],
            choice: text,
          })
        )
      }
      style={[styles.button]}
      android_ripple={pressableAndroidRipple}
    >
      <View style={styles.row}>
        <EduText style={styles.text}>{t(`Search/Filter/${text}`)}</EduText>
        <Icon
          name={
            searchParams?.[mapParentToKey[parent]] === mapChoiceToValue[text]
              ? IconNames.radioButtonChecked
              : IconNames.radioButtonOff
          }
        />
      </View>
    </Pressable>
  );
};

FilterChoice.propTypes = {
  text: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
};
FilterChoice.defaultProps = {};

export default FilterChoice;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: 22,
    padding: Constants.commonMargin / 2,
    marginRight: 'auto',
  },
});
