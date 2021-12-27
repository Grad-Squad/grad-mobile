import EduText from 'common/EduText';
import React, { useContext } from 'react';
import SearchContext from './SearchContext';

const SearchPeople = () => {

    const { formik } = useContext(SearchContext);

    return(
        <EduText>{formik.values.searchText} In People</EduText>
    )
}

SearchPeople.propTypes = {};
SearchPeople.defaultProps = {};

export default SearchPeople;