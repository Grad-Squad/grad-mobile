import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Modal from 'common/Modal';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { WhiteButton } from 'common/Input/Button';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import PressableText from 'common/PressableText';
import { resetSearchParams } from 'globalStore/searchSlice';
import { useLocalization } from 'localization';
import { useAPIGetSubjects } from 'api/endpoints/subjects';
import { useAPIGetTags } from 'api/endpoints/tags';
import { peoplePages, postsPages } from './Filter/filterPages';
import PageFilterer from './Filter/PageFilterer';

const FilterModal = ({ isModalVisible, setIsModalVisible }) => {
  const { t, isRTL } = useLocalization();
  const [pagesStack, setPagesStack] = useState([]);
  const onPressBackButton = () => {
    if (pagesStack.length === 0) {
      setIsModalVisible(false);
    } else {
      setPagesStack(
        pagesStack.filter((_, index) => index !== pagesStack.length - 1)
      );
    }
  };
  const dispatch = useDispatch();
  const params = useSelector((state) => state.search.params);
  const { data: subjectsData } = useAPIGetSubjects();
  const subjectPage = postsPages.find((page) => page.text === 'Subject');
  if (subjectPage) {
    subjectPage.children = subjectsData?.map((subject) => subject.content);
  }
  const { data: tagsData } = useAPIGetTags();
  const tagPage = postsPages.find((page) => page.text === 'Tag');
  if (tagPage) {
    tagPage.children = tagsData?.map((tag) => tag.content);
  }
  return (
    <Modal
      contentContainerStyle={styles.modalContainer}
      visible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      onRequestClose={() => setIsModalVisible(false)}
      hasBasicBackground
    >
      <View style={styles.modalContent}>
        <View style={styles.row}>
          <PressableIcon
            name={isRTL ? IconNames.arrowRight : IconNames.arrowLeft}
            size={35}
            onPress={onPressBackButton}
          />
          <EduText style={styles.title}>
            {pagesStack.length === 0
              ? t('Search/Filter/Filter')
              : t(`Search/Filter/${pagesStack[pagesStack.length - 1]}`)}
          </EduText>
          <PressableText
            pressableProps={{
              style: styles.reset,
              disabled: Object.keys(params).length === 0,
            }}
            style={Object.keys(params).length !== 0 && styles.resetText}
            onPress={() => dispatch(resetSearchParams())}
          >
            {t('Search/Filter/reset')}
          </PressableText>
        </View>
        <View style={styles.break} />
        {pagesStack.length === 0 && (
          <>
            <WhiteButton
              onPress={() => setPagesStack([...pagesStack, 'People'])}
              text={t('Search/Filter/Filter People')}
            />
            <View style={styles.break} />
            <WhiteButton
              onPress={() => setPagesStack([...pagesStack, 'Posts'])}
              text={t('Search/Filter/Filter Posts')}
            />
          </>
        )}
        {pagesStack?.[0] && (
          <PageFilterer
            pages={pagesStack?.[0] === 'People' ? peoplePages : postsPages}
            pagesStack={pagesStack}
            setPagesStack={setPagesStack}
          />
        )}
      </View>
    </Modal>
  );
};

FilterModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};
FilterModal.defaultProps = {};

export default FilterModal;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reset: {
    marginLeft: 'auto',
    padding: 5,
    paddingVertical: 10,
  },
  resetText: {
    color: Colors.accent,
  },
  title: {
    fontSize: 24,
  },
  break: {
    marginBottom: Constants.commonMargin,
  },
  modalContent: {
    backgroundColor: Colors.background,
    width: '100%',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
});
