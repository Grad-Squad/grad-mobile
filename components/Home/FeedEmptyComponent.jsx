import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { useAPIGetSubjects } from 'api/endpoints/subjects';
import { useLocalization } from 'localization';
import { DropdownList } from 'common/Input';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import { MainActionButton } from 'common/Input/Button';

const FeedEmptyComponent = () => {
  const mapDataToDropDownItems = (data) =>
    data.map((item) => ({ label: item.content, id: item.content }));
  const { data: subjects } = useAPIGetSubjects({ initialData: [] });
  const { t } = useLocalization();
  const [interests, setInterests] = useState();
  return (
    <View style={styles.container}>
      <EduText style={[styles.text, styles.biggerFont]}>
        {t('EmptyFeed/Oh no! Your feed is empty')}
      </EduText>
      <EduText style={styles.text}>
        {t('EmptyFeed/Please specify your interests')}
      </EduText>
      <DropdownList
        placeholder={t('EmptyFeed/SubjectCourse')}
        value={interests}
        setValueFunction={(newValue) => setInterests(newValue)}
        items={mapDataToDropDownItems(subjects)}
        multiple
        max={99}
      />
      <EduText style={styles.text}>
        {t(
          'EmptyFeed/You can change you interests at any time in the app settings'
        )}
      </EduText>
      <MainActionButton
        text={t('EmptyFeed/Submit')}
        style={styles.submitBtn}
        onPress={() => {
          // setIsQuestionAnswered(true);
          // onAnswerSubmitted();
        }}
      />
    </View>
  );
};
FeedEmptyComponent.propTypes = {};
FeedEmptyComponent.defaultProps = {};

export default FeedEmptyComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: Constants.commonMargin,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: (Constants.commonMargin * 2) / 3,
  },
  biggerFont: {
    fontSize: 20,
    paddingVertical: 0,
  },
  submitBtn: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.5,
  },
});
