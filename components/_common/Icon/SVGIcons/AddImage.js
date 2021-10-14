import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const width = 25.6;
const height = 24;
export const heightWidthRatio = height / width;

function AddImage({ fill, ...props }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 506 474"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M55 56.558h321.75V226.23h49.5V56.559c0-26.736-22.201-48.478-49.5-48.478H55c-27.299 0-49.5 21.742-49.5 48.477v290.864c0 26.735 22.201 48.477 49.5 48.477h198v-48.477H55V56.558z"
        fill={fill}
      />
      <Path
        d="M154.002 201.993l-74.25 96.954h272.25l-99-145.431-74.25 96.954-24.75-48.477z"
        fill={fill}
      />
      <Path
        d="M426.248 274.706h-49.5v72.716h-74.25v48.477h74.25v72.716h49.5v-72.716h74.25v-48.477h-74.25v-72.716z"
        fill={fill}
      />
    </Svg>
  );
}

export default React.memo(AddImage);
