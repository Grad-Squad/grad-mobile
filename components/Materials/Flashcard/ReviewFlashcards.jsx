import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { Colors, Constants } from 'styles';
import { navigationPropType } from 'proptypes';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'common/Page/Page';
import { Portal } from 'react-native-paper';
import MaterialViewHeader from 'common/MaterialHeader/MaterialViewHeader';
import { MainActionButton } from 'common/Input/Button';
import { setOpenMaterialData } from 'globalStore/materialNavSlice';
import ScreenNames from 'navigation/ScreenNames';
import LegendItem from '../_common/Review/LegendItem';
import CheeringWord from '../_common/Review/CheeringWord';
import ReviewFooterText from '../_common/Review/ReviewFooterText';
import ReviewFlashcardsModal from './ReviewFlashcardsModal';
import PieChart from '../_common/Review/PieChart';

const ReviewFlashcards = ({ navigation }) => {
  const { t } = useLocalization();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { data: storedAnswers, title } = useSelector(
    (state) => state.material.openMaterialData
  );
  const materialOwner = useSelector((state) => state.material.materialOwner);

  const isEasyCount = storedAnswers.filter((ans) => ans.isEasy).length;
  const isHardCount = storedAnswers.filter((ans) => ans.isHard).length;
  const skippedCount = storedAnswers.length - isEasyCount - isHardCount;

  const passedExercise = isEasyCount >= isHardCount;

  return (
    <Page>
      <Portal>
        <MaterialViewHeader
          onBackPress={() => navigation.goBack()}
          author={materialOwner?.name}
          title={title}
          contextMenuItems={[
            {
              titleKey: 'ContextMenu/Save',
              onPress: () => Alert.alert('WIP'),
              iconName: 'bookmark',
            },
          ]}
        />
        <ScrollView>
          <CheeringWord passedExercise={passedExercise} />
          <PieChart
            data={[
              {
                key: 'isEasyCount',
                count: isEasyCount,
                color: Colors.materialGood,
              },
              {
                key: 'isHardCount',
                count: isHardCount,
                color: Colors.materialWrong,
              },
              {
                key: 'skippedCount',
                count: skippedCount,
                color: Colors.materialSkipped,
              },
            ]}
          />
          <View style={styles.legendContainer}>
            <LegendItem
              label={t('FlashcardsReview/Easy')}
              style={styles.correct}
              count={isEasyCount}
            />
            <LegendItem
              label={t('FlashcardsReview/Hard')}
              style={styles.incorrect}
              count={isHardCount}
            />
            <LegendItem
              label={t('FlashcardsReview/Skipped')}
              style={styles.skipped}
              count={skippedCount}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <ReviewFooterText
            isPerfect={isEasyCount === storedAnswers.length}
            didPass={passedExercise}
          />
          <MainActionButton
            text={t('FlashcardsReview/Again?')}
            onPress={() => setIsModalVisible(true)}
          />
        </View>
        <ReviewFlashcardsModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isEasyAllowed={isEasyCount > 0}
          isHardAllowed={isHardCount > 0}
          isSkippedAllowed={skippedCount > 0}
          onFinish={(isEasy, isHard, isSkipped) => {
            dispatch(
              setOpenMaterialData({
                title,
                data: storedAnswers.filter(
                  (ans) =>
                    (ans.isEasy && isEasy) ||
                    (ans.isHard && isHard) ||
                    (!ans.solved && isSkipped)
                ),
              })
            );
            navigation.replace(ScreenNames.SOLVE_FLASHCARD);
          }}
        />
      </Portal>
    </Page>
  );
};

ReviewFlashcards.propTypes = {
  navigation: navigationPropType.isRequired,
};
ReviewFlashcards.defaultProps = {};

export default ReviewFlashcards;

const styles = StyleSheet.create({
  incorrect: {
    color: Colors.materialWrong,
  },
  correct: {
    color: Colors.materialGood,
  },
  skipped: {
    color: Colors.materialSkipped,
  },
  legendContainer: {
    marginTop: Constants.commonMargin,
    marginHorizontal: Dimensions.get('window').width * 0.12,
  },
  pieChart: {
    alignSelf: 'center',
  },
  footer: {
    marginTop: 'auto',
    margin: Constants.commonMargin,
    paddingTop: 5,
  },
});
