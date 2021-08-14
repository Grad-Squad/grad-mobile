import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const Facebook = () => (
  <Svg
    width={27}
    height={27}
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#prefix__clip0)">
      <Path
        d="M25.51 27A1.49 1.49 0 0027 25.51V1.49A1.49 1.49 0 0025.51 0H1.49A1.49 1.49 0 000 1.49v24.02C0 26.333.667 27 1.49 27h24.02z"
        fill="#395185"
      />
      <Path
        d="M18.63 27V16.544h3.51l.524-4.075H18.63V9.869c0-1.18.328-1.984 2.02-1.984l2.158-.001V4.239c-.374-.05-1.654-.161-3.145-.161-3.11 0-5.24 1.899-5.24 5.386v3.005h-3.52v4.075h3.52V27h4.207z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Path fill="#fff" d="M0 0h27v27H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Facebook;
