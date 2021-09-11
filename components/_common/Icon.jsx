import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

const map = {
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
  'play-video': Foundation,
};

const Icon = ({ name, size, color }) => {
  const IconLibrary = map[name];
  return <IconLibrary name={name} size={size} color={color} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};
Icon.defaultProps = {
  size: 26,
  color: Colors.offBlack,
};

export default React.memo(Icon);
