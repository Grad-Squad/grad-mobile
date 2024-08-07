import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, PressableIcon } from 'common/Icon';
import { Button } from 'common/Input/Button';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';
import { Colors, Constants } from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { removeParam } from 'globalStore/searchSlice';
import { useLocalization } from 'localization';
import { mapParentToKey } from './filterMaps';

const FilterItem = ({ page, onPress }) => {
  const { iconName, text, isDynamic } = page;
  const searchParamsText = useSelector((state) => state.search.paramsText);
  const currentChoice = searchParamsText?.[mapParentToKey[text]];
  const dispatch = useDispatch();
  const { t } = useLocalization();
  return (
    <View style={styles.row}>
      <Button
        leftIcon={<Icon name={iconName} />}
        text={t(`Search/Filter/${text}`)}
        onPress={onPress}
        style={styles.buttonStyle}
      />
      {currentChoice && (
        <>
          <EduText style={styles.currentChoice}>
            {isDynamic ? currentChoice : t(`Search/Filter/${currentChoice}`)}
          </EduText>
          <PressableIcon
            name={IconNames.close}
            onPress={() => dispatch(removeParam(mapParentToKey[text]))}
          />
        </>
      )}
    </View>
  );
};

FilterItem.propTypes = {
  page: PropTypes.exact({
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.string.isRequired),
    isDynamic: PropTypes.bool,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
FilterItem.defaultProps = {};

export default FilterItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  currentChoice: {
    marginLeft: 'auto',
    color: Colors.accent,
    fontSize: 18,
    marginRight: Constants.commonMargin / 2,
  },
});
