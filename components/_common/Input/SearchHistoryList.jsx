import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';
import { stylePropType } from 'proptypes';

const SearchHistoryList = ({setText, items, setItems, style}) => {

    const onHistoryItemPress = (text) => {
      setText(text)
    }

    const onHistoryItemDelete = (text) => { // todo replace items in storage with new items
      const newItems = [...items];
      newItems.splice(newItems.map((item) => item.text).indexOf(text), 1);
      setItems(newItems)
    }

    return(
        <FlatList
            data={items}
            contentContainerStyle={[styles.container, style]}
            keyboardShouldPersistTaps='handled'
            keyExtractor={item => item.text}
            renderItem={({ item }) => {
            const { text } = item;
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => onHistoryItemPress(text)}>
                    <Icon name={IconNames.history} size={20} style={{marginRight: 'auto', marginLeft: 8}}/>
                    <EduText style={styles.textStyle}>{text}</EduText>
                    <PressableIcon name={IconNames.close} size={20} style={{marginLeft: 'auto', marginRight: 8}} onPress={() => onHistoryItemDelete(text)}/>
                </TouchableOpacity>
            );
        }}
      />
)};

export default SearchHistoryList;

SearchHistoryList.propTypes = {
  setText: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
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
  listItem:{
    flexDirection:'row',
    flex:1,
    marginVertical: 10,
  },
  textStyle:{
    flex:1,
    paddingHorizontal: 10,
    fontSize: 18,
  }
});
