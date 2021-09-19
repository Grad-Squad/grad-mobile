import React from 'react';
import PropTypes from 'prop-types';
import AddImage, {
  heightWidthRatio as addImageHeightWidthRatio,
} from './AddImage';

const map = {
  AddImage: { Icon: AddImage, heightWidthRatio: addImageHeightWidthRatio },
};

const SVGIcons = ({ name, size, color }) => {
  const { Icon, heightWidthRatio } = map[name];
  return <Icon fill={color} height={size * heightWidthRatio} width={size} />;
};

SVGIcons.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
SVGIcons.defaultProps = {};

export default SVGIcons;
