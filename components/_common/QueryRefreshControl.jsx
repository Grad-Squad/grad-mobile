import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native';
import { Colors } from 'styles';

const QueryRefreshControl = ({ refetch, isFetching, isLoading, ...props }) => {
  const [isRefetching, setIsRefetching] = useState(false);
  useEffect(() => {
    if (isRefetching) {
      setIsRefetching(isFetching && !isLoading);
    }
  }, [isFetching, isLoading]);
  return (
    <RefreshControl
      refreshing={isRefetching}
      onRefresh={() => {
        setIsRefetching(true);
        refetch();
      }}
      tintColor={Colors.accent}
      titleColor={Colors.accent}
      colors={[Colors.accent]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

QueryRefreshControl.propTypes = {
  refetch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
QueryRefreshControl.defaultProps = {};

export default QueryRefreshControl;
