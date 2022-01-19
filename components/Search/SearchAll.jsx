import EduText from 'common/EduText';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { navigationBarPropType } from 'proptypes';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import SearchPosts from './SearchPosts';
import SearchPeople from './SearchPeople';

// eslint-disable-next-line arrow-body-style
const SearchAll = ({navigation}) => {

    const { t } = useLocalization();

    return(
        <View style={{overflow: 'scroll'}}>
            <View style={styles.specificSearchContainer}>
                <EduText style={styles.specificSearchTitle}>{t('Search/People')}</EduText>
                <SearchPeople navigation={navigation} numOfProfiles={5}/>
                <Button mode="outlined" onPress={() => navigation.jumpTo('SearchPeople')} style={styles.viewMoreButton}>{t('Search/More')}</Button>
            </View>
            <View style={styles.specificSearchContainer}>
                <EduText style={styles.specificSearchTitle}>{t('Search/Posts')}</EduText>
                <SearchPosts navigation={navigation} numOfPosts={3}/>
                <Button mode="outlined" onPress={() => navigation.jumpTo('SearchPosts')} style={styles.viewMoreButton}>{t('Search/More')}</Button>
            </View>
        </View>
    )
}

SearchAll.propTypes = {
    navigation: navigationBarPropType.isRequired,
};
SearchAll.defaultProps = {};

export default SearchAll;

const styles = StyleSheet.create({
    specificSearchContainer:{
        width: '100%',
        paddingVertical: 5,
        backgroundColor: Colors.background2,
        marginBottom: 5,
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