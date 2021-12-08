import React from 'react';
import { Colors } from 'styles';
import { Fade } from 'rn-placeholder';

const DarkFade = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Fade {...props} style={{ backgroundColor: Colors.cgrey }} />
);

DarkFade.propTypes = {};

export default DarkFade;
