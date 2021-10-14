import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { stylePropType } from 'proptypes';

function BoundingCircle({ color, style }) {
  return (
    <Svg
      width={223}
      height={134}
      viewBox="0 0 223 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Path
        d="M223 67c0 37.003-49.92 67-111.5 67S0 104.003 0 67 49.92 0 111.5 0 223 29.997 223 67z"
        fill={color}
      />
    </Svg>
  );
}

const MemoBoundingCircle = React.memo(BoundingCircle);
export default MemoBoundingCircle;

BoundingCircle.propTypes = {
  color: PropTypes.string.isRequired,
  style: stylePropType,
};
BoundingCircle.defaultProps = { style: {} };
