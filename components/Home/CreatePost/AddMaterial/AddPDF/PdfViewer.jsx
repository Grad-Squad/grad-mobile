import React from 'react';
import PropTypes from 'prop-types';
import PdfReader from 'rn-pdf-reader-js';

const PdfViewer = ({ uri }) =>
  !!uri && (
    <PdfReader
      source={{
        uri,
      }}
    />
  );

PdfViewer.propTypes = {
  uri: PropTypes.string,
};
PdfViewer.defaultProps = {
  uri: undefined,
};

export default React.memo(PdfViewer);
