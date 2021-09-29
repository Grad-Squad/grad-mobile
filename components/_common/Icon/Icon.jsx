import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextPropType } from 'proptypes';
import SVGIcons from './SVGIcons';

const map = {
  question: AntDesign,
  close: Ionicons,
  'home-outline': Ionicons,
  'radio-button-checked': MaterialIcons,
  'radio-button-off': MaterialIcons,
  'bell-outline': MaterialCommunityIcons,
  search: Octicons,
  'add-circle-outline': MaterialIcons,
  bookmark: Feather,
  menu: Feather,
  'cards-outline': MaterialCommunityIcons,
  'format-list-checkbox': MaterialCommunityIcons,
  pdffile1: AntDesign,
  'image-outline': MaterialCommunityIcons,
  'ondemand-video': MaterialIcons,
  'dots-horizontal': MaterialCommunityIcons,
  'dots-vertical': MaterialCommunityIcons,
  'edit-2': Feather,
  'check-square': Feather,
  square: Feather,
  AddImage: SVGIcons,
  'delete-outline': MaterialIcons,
  'send':MaterialIcons,
  "arrow-left":MaterialCommunityIcons,
  'plus':Feather,
  'comment-outline':MaterialCommunityIcons,
};

const Icon = ({ name, size, color, style }) => {
  const IconLibrary = map[name] || map.question;
  return <IconLibrary name={name} size={size} color={color} style={style} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: TextPropType,
};
Icon.defaultProps = {
  size: 26,
  color: Colors.offBlack,
  style: {},
};

export default React.memo(Icon);
