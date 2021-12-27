import EduText from 'common/EduText';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { navigationBarPropType } from 'proptypes';
import { Colors, Constants } from 'styles';
import { ScrollView } from 'react-native-gesture-handler';
import SearchContext from './SearchContext';
import SearchPosts from './SearchPosts';
import SearchPeople from './Searchpeople';

// eslint-disable-next-line arrow-body-style
const SearchAll = ({navigation}) => {

    const { formik, t } = useContext(SearchContext);

    return(
        <ScrollView>
            <View style={styles.specificSearchContainer}>
                <EduText style={styles.specificSearchTitle}>{t('Search/People')}</EduText>
                <SearchPeople numOfProfiles={2}/>
                <Button mode="outlined" onPress={() => navigation.jumpTo('SearchPeople')} style={styles.viewMoreButton}>{t('Search/More')}</Button>
            </View>
            <View style={styles.specificSearchContainer}>
                <EduText style={styles.specificSearchTitle}>{t('Search/Posts')}</EduText>
                <SearchPosts numOfPosts={2}/>
                <Button mode="outlined" onPress={() => navigation.jumpTo('SearchPosts')} style={styles.viewMoreButton}>{t('Search/More')}</Button>
            </View>
        </ScrollView>
    )
}

SearchAll.propTypes = {
    navigation: navigationBarPropType.isRequired,
};
SearchAll.defaultProps = {};

export default SearchAll;

const styles = StyleSheet.create({
    specificSearchContainer:{
        padding: 5,
        backgroundColor: Colors.background2,
        marginVertical: 5,
        borderColor: Colors.border,
        borderWidth: 0.25,
    },
    viewMoreButton:{
        alignSelf:'center',
        width: '90%',
        borderColor: Colors.accent,
        borderRadius: Constants.borderRadius,
        margin: 5,
    },
    specificSearchTitle:{
        margin: 5,
        marginTop: 7,
        fontSize: 15,
    }
})