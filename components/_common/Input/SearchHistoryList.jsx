import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';
import { stylePropType } from 'proptypes';
import { useLocalization } from 'localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';

const SearchHistoryList = ({ setText, items, setItems, style }) => {
  const { t } = useLocalization();

  const onHistoryItemPress = (text) => {
    setText(text);
  };

  const onHistoryItemDelete = (text) => {
    const newItems = [...items];
    newItems.splice(newItems.map((item) => item.text).indexOf(text), 1);
    setItems(newItems);
    const stringified = JSON.stringify(newItems);
    AsyncStorage.setItem(localStorageKeys.search_history, stringified).catch(
      (err) => {
        // todo handle error
        console.warn('Saving Search History: ', err);
      }
    );
  };

  return (
    <FlatList
      data={items}
      contentContainerStyle={[styles.container, style]}
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.text}
      renderItem={({ item }) => {
        const { text } = item;
        return (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => onHistoryItemPress(text)}
          >
            <Icon
              name={IconNames.history}
              size={20}
              style={{ marginRight: 'auto', marginLeft: 8 }}
            />
            <EduText style={styles.textStyle}>{text}</EduText>
            <PressableIcon
              name={IconNames.close}
              size={20}
              style={{ marginLeft: 'auto', marginRight: 8 }}
              onPress={() => onHistoryItemDelete(text)}
            />
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Icon name={IconNames.clock} />
          <EduText>{t('Search/NoHistory')}</EduText>
        </View>
      )}
    />
  );
};

export default SearchHistoryList;

SearchHistoryList.propTypes = {
  setText: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  setItems: PropTypes.func.isRequired,
  style: stylePropType,
};

SearchHistoryList.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
  },
  textStyle: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
