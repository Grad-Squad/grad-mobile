import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import PropTypes from 'prop-types';
import { stylePropType } from 'proptypes';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors } from 'styles';
import TagLabel from 'common/TagLabel';

const DropdownList = ({
  placeholder,
  items,
  style,
  multiple,
  value,
  setValueFunction,
  min,
  max,
}) => {
  const [open, setOpen] = useState(false);
  const [choices, setChoices] = useState([]);

  // const listRef = useRef(null);

  const onPresshandler = (key) => {

    if(choices.includes(key)){              // item pressed already exists -> remove that item
        const correct = [...choices]
        correct.splice(correct.indexOf(key), 1);
        setChoices(correct)
    }else if(multiple){                     // item pressed does not exist -> add item if multiple
        if (choices.length < max)
            setChoices([...choices, key])
    }else{                                  // item pressed does not exist -> switch to item if single
        setChoices([key])
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
        style={styles.listItem}
        onPress={() => onPresshandler(item.id)}
        android_ripple={pressableAndroidRipple}
    >
      <Text>{item.label}</Text>
      {choices.includes(item.id) &&
      <Icon name={IconNames.dropdown} size={20}/>
      }
    </Pressable>
  );

  const renderTag = ({ item }) => (
    <View style={styles.tags}>
        <TagLabel
            labelText={item}
        />
    </View>
  );

  useEffect(() => {
    setValueFunction(choices)
  }, [choices])

  return (
    <View style={[style, styles.container]}>
        <Pressable
            onPress={() => setOpen(!open)}
            style={styles.Button}
            android_ripple={pressableAndroidRipple}
        >
            <View style={{flexWrap:'wrap'}}>
                {choices.length > 0 ?
                <FlatList
                horizontal
                data={choices}
                renderItem={renderTag}
                keyExtractor={(item) => item}
                style={{width:"100%",zIndex:10}}
                contentContainerStyle={{alignItems:'center'}}
                />
                :
                <Text style={styles.ButtonText}>{placeholder}</Text>}
            </View>
            <Icon style={styles.ButtonIcon} name={IconNames.dropdownClosed} />
        </Pressable>
      <>
      {open && (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listBackground}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} // or whatever unique value that exists
          />
      )}
      </>
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setValueFunction: PropTypes.func.isRequired,
  style: stylePropType,
  // eslint-disable-next-line react/forbid-prop-types
  multiple: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};
DropdownList.defaultProps = {
  placeholder: 'list', // todo
  value: null,
  style: {},
  multiple: false,
  min: 0,
  max: 1,
};

export default DropdownList;

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        borderColor: Colors.separator,
        borderBottomWidth:1,
    },
    list: {
        // position: 'absolute',
        width: '100%',
        maxHeight:'50%',
        overflow:'scroll',
        backgroundColor: Colors.background,
        borderColor: Colors.offBlack,
        borderWidth: 1,
        borderRadius: 0.1,
        zIndex:10,
    },
    listItem: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent:'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10,
        zIndex:10,
        width:'100%',
    },
    Button: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent:'space-between',
        paddingVertical: 7,
        paddingHorizontal: 8,
    },
    tags: {
        paddingHorizontal: 0.6,
    },

});
