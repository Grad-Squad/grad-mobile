import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Modal from 'common/Modal';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { WhiteButton } from 'common/Input/Button';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { peoplePages, postsPages } from './Filter/filterPages';
import PageFilterer from './Filter/PageFilterer';

const FilterModal = ({ isModalVisible, setIsModalVisible }) => {
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
  return (
    <Modal
      contentContainerStyle={styles.modalContainer}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
      hasBasicBackground
    >
      <View style={styles.modalContent}>
        <View style={styles.row}>
          <PressableIcon
            name={IconNames.arrowLeft}
            size={35}
            onPress={onPressBackButton}
          />
          <EduText style={styles.title}>
            {pagesStack.length === 0
              ? 'Filter'
              : pagesStack[pagesStack.length - 1]}
          </EduText>
          <EduText style={styles.reset}>reset</EduText>
        </View>
        <View style={styles.break} />
        {pagesStack.length === 0 && (
          <>
            <WhiteButton
              onPress={() => setPagesStack([...pagesStack, 'People'])}
              text="Filter People"
            />
            <View style={styles.break} />
            <WhiteButton
              onPress={() => setPagesStack([...pagesStack, 'Posts'])}
              text="Filter Posts"
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
