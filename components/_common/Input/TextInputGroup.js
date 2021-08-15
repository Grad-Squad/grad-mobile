import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { childrenPropType } from '../../../proptypes';
import TextInput from './TextInput';

function TextInputGroup({ children, onFinish, style }) {
  const nextTextInputMap = {};
  const inputsRefs = [];
  let lastTextInputIndex;

  const newChildren = [...children].reverse().map((element, index) => { // runs every re-render, ok for a couple of children
    inputsRefs.push(createRef());
    const extraProps = { key: index }; // bad idea

    if (typeof element === 'boolean') {
      return undefined;
    }

    if (element.type === TextInput) {
      extraProps.TextInputProps = {
        ref: inputsRefs[index],
      };

      if (lastTextInputIndex === undefined) {
        extraProps.TextInputProps = {
          ...extraProps.TextInputProps,
          returnKeyType: 'done',
          onSubmitEditing: onFinish,
        };
      } else {
        nextTextInputMap[index] = lastTextInputIndex;
        extraProps.TextInputProps = {
          ...extraProps.TextInputProps,
          returnKeyType: 'next',
          blurOnSubmit: false,
          onSubmitEditing: () => {
            inputsRefs[nextTextInputMap[index]].current.focus();
          },
        };
      }
      lastTextInputIndex = index;
    }

    return React.cloneElement(element, extraProps);
  });
  newChildren.reverse();
  return <View style={style}>{newChildren}</View>;
}

TextInputGroup.propTypes = {
  children: childrenPropType.isRequired,
  onFinish: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};
TextInputGroup.defaultProps = { style: {} };

export default TextInputGroup;
