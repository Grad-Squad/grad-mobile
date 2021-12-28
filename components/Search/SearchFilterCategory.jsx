import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EduText from 'common/EduText';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Searchbar } from 'react-native-paper';
import { useLocalization } from 'localization';

const SearchFilterCategory = ({items, choice, setChoice, searchable}) => {

    const [filteredItems, setFilteredItems] = useState(items)
    const [searchText, setSearchText] = useState("")

    const { t } = useLocalization();

    const HandleChange = (newText) => {
        if(searchable)
        {
            setSearchText(newText)
            setFilteredItems(
            newText
            ? items.filter(x => x.key.toLowerCase().includes(newText.toLowerCase()))
            : items
            )
        }
    }

    return(
        <View style={{flexDirecton:'row'}}>
            {searchable?
                <Searchbar
                    value={searchText}
                    onChangeText={(changedText) => HandleChange(changedText)}
                    placeholder={t('Search')}
                />
            :
                <></>
            }
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item}
                renderItem={(item) =>
                <TouchableOpacity onPress={() => setChoice(item)}>
                    <EduText>{t(item)}</EduText>
                    <Icon
                        name={
                            item === choice
                            ? IconNames.radioButtonChecked
                            : IconNames.radioButtonOff
                        }
                        size={25}
                    />
                </TouchableOpacity>
                }
            />
        </View>
    )
}

SearchFilterCategory.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    choice: PropTypes.string.isRequired,
    setChoice: PropTypes.func.isRequired,
    searchable: PropTypes.bool,
};
SearchFilterCategory.defaultProps = {
    searchable: false,
};

export default SearchFilterCategory;