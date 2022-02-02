import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextPropType } from 'proptypes';
import SVGIcons from './SVGIcons';

export const IconNames = Object.freeze({
  question: 'question',
  close: 'close',
  home: 'home-outline',
  radioButtonChecked: 'radio-button-checked',
  radioButtonOff: 'radio-button-off',
  bell: 'bell-outline',
  search: 'search',
  addCircle: 'add-circle-outline',
  bookmark: 'bookmark-outline',
  bookmarkFilled: 'bookmark',
  menu: 'menu',
  cards: 'cards-outline',
  checklist: 'format-list-checkbox',
  pdf: 'pdffile1',
  image: 'image-outline',
  video: 'ondemand-video',
  dotsHorizontal: 'dots-horizontal',
  dotsVertical: 'dots-vertical',
  edit: 'edit-2',
  checkbox: 'check-square',
  dropdown: 'check-circle',
  dropdownClosed: 'chevron-down',
  square: 'square',
  AddImage: 'AddImage',
  delete: 'delete-outline',
  send: 'send',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  plus: 'plus',
  comment: 'comment-outline',
  share: 'sharealt',
  settings: 'settings-outline',
  logout: 'logout',
  report: 'flag',
  tagDot: 'dot-single',
  addDocument: 'text-box-plus-outline',
  keyboardArrowLeft: 'keyboard-arrow-left',
  cameraPlus: 'camera-plus-outline',
  keyboardArrowRight: 'keyboard-arrow-right',
  addVideo: 'file-video-outline',
  Folder: 'folder-outline',
  removeImage: 'image-remove',
  add: 'add',
  moveFile:'folder-move-outline'
});

export const iconNamesPropType = PropTypes.oneOf(Object.values(IconNames));

const map = {
  question: AntDesign,
  close: Ionicons,
  'home-outline': Ionicons,
  'radio-button-checked': MaterialIcons,
  'radio-button-off': MaterialIcons,
  'bell-outline': MaterialCommunityIcons,
  search: Octicons,
  'add-circle-outline': MaterialIcons,
  'bookmark-outline': MaterialCommunityIcons,
  bookmark: MaterialCommunityIcons,
  menu: Feather,
  'cards-outline': MaterialCommunityIcons,
  'format-list-checkbox': MaterialCommunityIcons,
  pdffile1: AntDesign,
  'image-outline': MaterialCommunityIcons,
  'ondemand-video': MaterialIcons,
  'dots-horizontal': MaterialCommunityIcons,
  'dots-vertical': MaterialCommunityIcons,
  'chevron-down': MaterialCommunityIcons,
  'edit-2': Feather,
  'check-square': Feather,
  'check-circle': Feather,
  square: Feather,
  AddImage: SVGIcons,
  'delete-outline': MaterialIcons,
  send: MaterialIcons,
  'arrow-left': MaterialCommunityIcons,
  'arrow-right': MaterialCommunityIcons,
  plus: Feather,
  'comment-outline': MaterialCommunityIcons,
  sharealt: AntDesign,
  'settings-outline': Ionicons,
  logout: MaterialCommunityIcons,
  flag: AntDesign,
  'dot-single': Entypo,
  'text-box-plus-outline': MaterialCommunityIcons,
  'keyboard-arrow-left': MaterialIcons,
  'camera-plus-outline': MaterialCommunityIcons,
  'keyboard-arrow-right': MaterialIcons,
  'file-video-outline': MaterialCommunityIcons,
  'folder-outline': MaterialCommunityIcons,
  'image-remove': MaterialCommunityIcons,
  add: MaterialIcons,
  'folder-move-outline': MaterialCommunityIcons
};

const Icon = ({ name, size, color, style, disabled }) => {
  const IconLibrary = map[name] || map[IconNames.question];
  return (
    <IconLibrary
      name={name}
      size={size}
      color={disabled ? Colors.disabledButton : color}
      style={style}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: TextPropType,
  disabled: PropTypes.bool,
};
Icon.defaultProps = {
  size: 26,
  color: Colors.offBlack,
  style: {},
  disabled: false,
};

export default React.memo(Icon);
