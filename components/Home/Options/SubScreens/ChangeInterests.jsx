import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Colors, Constants } from 'styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useLocalization } from 'localization';
import { DropdownList } from 'common/Input';
import {
  useAPIGetSubjects,
  useGetFavoriteSubjects,
  useUpdateFavoriteSubjects,
} from 'api/endpoints/subjects';
import { MainActionButton } from 'common/Input/Button';

const ChangeInterests = () => {
  const navigation = useNavigation();
  const [interests, setInterests] = useState();
  const { data: subjects } = useAPIGetSubjects({ initialData: [] });

  const mapDataToDropDownItems = (data) =>
    data.map((item) => ({ label: item.content, id: item.content }));

  const { t } = useLocalization();
  const [lateInitInterests, setLateInitInterests] = useState(null);
  useGetFavoriteSubjects({
    onSuccess: (data) => {
      setInterests(data.map((subject) => subject.content));
      setLateInitInterests(data.map((subject) => subject.content));
    },
  });
  const updateInterestsMutation = useUpdateFavoriteSubjects({
    onSuccess: () => {
      navigation.goBack();
    },
  });
  return (
    <Page>
      <View style={styles.container}>
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
      </View>
    </Page>
  );
};

ChangeInterests.propTypes = {};
ChangeInterests.defaultProps = {};

export default ChangeInterests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: Constants.commonMargin * 2,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: (Constants.commonMargin * 2) / 3,
  },
  submitBtn: {
    alignSelf: 'center',
    marginTop: (Constants.commonMargin * 2) / 3,
    width: Dimensions.get('window').width * 0.5,
  },
});
