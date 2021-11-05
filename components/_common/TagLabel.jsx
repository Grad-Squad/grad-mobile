import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'styles';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

const TagLabel = ({ labelText, labelColor, textColor }) => (
  <View style={[styles.wrapper, {backgroundColor: labelColor}]}>
    <Icon name={IconNames.tagDot} size={20} color={Colors.background}/>
    <Text style={[styles.text, {color: textColor}]}>{labelText}</Text>
  </View>
);

TagLabel.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
};

TagLabel.defaultProps = {
    labelColor: Colors.accent,
    textColor: Colors.white,
};

export default TagLabel;

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        borderRadius:10,
        justifyContent: 'flex-start',
        alignItems:'center',
        marginVertical:2,
        paddingRight:10,
    },
    text:{
        fontSize:15,
    },
});