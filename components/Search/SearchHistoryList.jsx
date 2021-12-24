import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';

const SearchHistoryList = ({setText, items, setItems}) => {

    const onHistoryItemPress = (text) => {
      setText(text)
    }

    const onHistoryItemDelete = (id) => { // todo replace items in storage with new items
      const newItems = [...items];
      newItems.splice(newItems.map((item) => item.id).indexOf(id), 1);
      setItems(newItems)
    }

    return(
        <FlatList
            data={items}
            contentContainerStyle={styles.container}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
            const { id, text } = item;
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => onHistoryItemPress(text)}>
                    <Icon name={IconNames.history} size={20} style={{marginRight: 'auto', marginLeft: 8}}/>
                    <EduText style={styles.textStyle}>{text}</EduText>
                    <PressableIcon name={IconNames.close} size={20} style={{marginLeft: 'auto', marginRight: 8}} onPress={() => onHistoryItemDelete(id)}/>
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
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setItems: PropTypes.func.isRequired,
};

SearchHistoryList.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
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
