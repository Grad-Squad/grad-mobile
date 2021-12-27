import EduText from 'common/EduText';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { navigationBarPropType } from 'proptypes';
import SearchContext from './SearchContext';

// eslint-disable-next-line arrow-body-style
const SearchAll = ({navigation}) => {

    const { formik } = useContext(SearchContext);

    return(
        <View>
            <EduText>{formik.values.searchText} In All</EduText>
            <Button mode="outlined" onPress={() => navigation.jumpTo('SearchPosts')} style={styles.viewMoreButton}>See More (Posts)</Button>
            <Button  mode="outlined" onPress={() => navigation.jumpTo('SearchPeople')}>See More (People)</Button>
        </View>
    )
}

SearchAll.propTypes = {
    navigation: navigationBarPropType.isRequired,
};
SearchAll.defaultProps = {};

export default SearchAll;

const styles = StyleSheet.create({
    viewMoreButton:{}
})