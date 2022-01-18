import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Pressable, StyleSheet, Modal } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import PropTypes from 'prop-types';
import { stylePropType } from 'proptypes';
import { Icon, PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors, Constants } from 'styles';
import TagLabel from 'common/TagLabel';
import EduText from 'common/EduText';
import { searchUtil } from 'api/util';
import TransparentTextInput from './TransparentTextInput';

const renderItem = (item, onPresshandler, choices) => (
  <Pressable
    style={styles.listItem}
    onPress={() => onPresshandler(item.label)}
    android_ripple={pressableAndroidRipple}
  >
    <EduText>{item.label}</EduText>
    {choices.includes(item.label) && (
      <Icon name={IconNames.dropdown} size={20} />
    )}
  </Pressable>
);

const DropdownList = ({
  placeholder,
  items,
  style,
  multiple,
  value,
  setValueFunction,
  min,
  max,
  lateInitChoice,
}) => {
  const [open, setOpen] = useState(false);
  const [choices, setChoices] = useState(value ? [value] : []);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => {
    if (searchText !== '') {
      setFilteredItems(
        items.filter((item) => searchUtil(searchText, item.label.toLowerCase()))
      );
    } else {
      setFilteredItems(items);
    }
  }, [items, searchText]);
  useEffect(() => {
    if (lateInitChoice == null) {
      return;
    }
    if (Array.isArray(lateInitChoice)) {
      setChoices(lateInitChoice);
      // setValueFunction(lateInitChoice);
    } else if (lateInitChoice) {
      setChoices([lateInitChoice]);
    }
  }, [lateInitChoice]);

  const onPresshandler = useCallback(
    (key) => {
      let currentChoices;

      // item pressed already exists -> remove that item
      if (choices.includes(key)) {
        const correct = [...choices];
        correct.splice(correct.indexOf(key), 1);
        currentChoices = correct;

        // item pressed does not exist -> add item if multiple
      } else if (multiple) {
        if (choices.length < max) currentChoices = [...choices, key];
        else return;

        // item pressed does not exist -> switch to item if single
      } else {
        currentChoices = [key];
      }
      setChoices(currentChoices.filter((ch) => !!ch));
      setValueFunction(currentChoices);
    },
    [choices, max, multiple, setValueFunction]
  );

  return (
    <View style={[style, styles.container]}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={styles.Button}
        android_ripple={pressableAndroidRipple}
      >
        {choices.length > 0 && multiple ? (
          <View
            style={[styles.tags, open ? styles.tagOpened : styles.tagOpened]}
          >
            {items.map((item) => {
              if (choices.includes(item.id))
                return (
                  <View style={{ paddingHorizontal: 2 }} key={item.id}>
                    <TagLabel labelText={item.label} />
                  </View>
                );
              return null;
            })}
          </View>
        ) : (
          <EduText style={styles.singleChoiceStyle}>
            {choices.length === 1 ? choices[0] || placeholder : placeholder}
          </EduText>
        )}
        <Icon name={IconNames.dropdownClosed} />
      </Pressable>
      <Modal
        animationType="slide"
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.listWrapper}>
          <View style={styles.searchbar}>
            <PressableIcon
              name={IconNames.close}
              size={35}
              onPress={() => setOpen(!open)}
            />
            <TransparentTextInput
              text={searchText}
              setText={setSearchText}
              style={{ width: '87%' }}
            />
          </View>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listBackground}
            data={filteredItems}
            renderItem={({ item }) => renderItem(item, onPresshandler, choices)}
            keyExtractor={(item) => item.id} // or whatever unique value that exists
          />
        </View>
      </Modal>
    </View>
  );
};

DropdownList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired, // or whatever unique value that exists
    })
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  setValueFunction: PropTypes.func.isRequired,
  style: stylePropType,
  multiple: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  lateInitChoice: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
DropdownList.defaultProps = {
  placeholder: 'list', // todo
  value: null,
  style: {},
  multiple: false,
  min: 0,
  max: 1,
  lateInitChoice: null,
};

export default DropdownList;

const styles = StyleSheet.create({
  singleChoiceStyle: {
    alignSelf: 'center',
    marginLeft: Constants.commonMargin / 2,
  },
  container: {
    zIndex: 5,
    borderColor: Colors.separator,
    borderBottomWidth: 1,
  },
  list: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: Colors.background,
    zIndex: 1,
    alignSelf: 'center',
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listWrapper: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    zIndex: 1,
    width: '100%',
  },
  Button: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  tags: {
    paddingHorizontal: 1,
    flexDirection: 'row',
    width: '90%',
  },
  tagOpened: {
    flexWrap: 'wrap',
    overflow: 'visible',
  },
  tagClosed: {
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
});
