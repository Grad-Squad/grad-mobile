import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import getCheeringWords, { wordTypes } from '../getCheeringWords';

const CheeringWord = ({ passedExercise }) => {
  const { t } = useLocalization();
  const cheeringWord = useMemo(
    () =>
      passedExercise
        ? getCheeringWords(wordTypes.good, t)
        : getCheeringWords(wordTypes.bad, t),
    [passedExercise]
  );
  return <EduText style={styles.header}>{cheeringWord}</EduText>;
};

CheeringWord.propTypes = {
  passedExercise: PropTypes.bool.isRequired,
};
CheeringWord.defaultProps = {};

export default React.memo(CheeringWord);

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    textAlign: 'center',
    margin: Constants.commonMargin,
    fontSize: 32,
  },
});
