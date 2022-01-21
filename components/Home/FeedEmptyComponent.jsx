import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Proptypes from 'prop-types';
import {
  useAPIGetSubjects,
  useGetFavoriteSubjects,
  useUpdateFavoriteSubjects,
} from 'api/endpoints/subjects';
import { useLocalization } from 'localization';
import { DropdownList } from 'common/Input';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import { MainActionButton } from 'common/Input/Button';

const FeedEmptyComponent = ({ onInterestsUpdated }) => {
  const mapDataToDropDownItems = (data) =>
    data.map((item) => ({ label: item.content, id: item.content }));
  const { data: subjects } = useAPIGetSubjects({ initialData: [] });
  const [interests, setInterests] = useState();
  const { t } = useLocalization();
  const [lateInitInterests, setLateInitInterests] = useState(null);
  useGetFavoriteSubjects({
    onSuccess: (data) => {
      setInterests(data.map((subject) => subject.content));
      setLateInitInterests(data.map((subject) => subject.content));
    },
  });
  const updateInterestsMutation = useUpdateFavoriteSubjects({
    onSuccess: () => onInterestsUpdated(),
  });
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
        lateInitChoice={lateInitInterests}
        items={mapDataToDropDownItems(subjects)}
        multiple
        max={9999}
      />
      <EduText style={styles.text}>
        {t(
          'EmptyFeed/You can change your interests at any time in the app settings'
        )}
      </EduText>
      <MainActionButton
        disabled={!interests}
        text={t('EmptyFeed/Submit')}
        style={styles.submitBtn}
        onPress={() => {
          const subjectNameToId = {};
          subjects.forEach((subject) => {
            subjectNameToId[subject.content] = subject.id;
          });
          const subjectIds = interests?.map(
            (subjectName) => subjectNameToId[subjectName]
          );
          updateInterestsMutation.mutate(subjectIds);
        }}
      />
      <EduText
        style={[
          styles.text,
          !updateInterestsMutation.isSuccess && styles.opacityZero,
        ]}
      >
        {t('EmptyFeed/Sent Successfully ✅')}
      </EduText>
    </View>
  );
};
FeedEmptyComponent.propTypes = {
  onInterestsUpdated: Proptypes.func.isRequired,
};
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
  opacityZero: {
    opacity: 0,
  },
});
