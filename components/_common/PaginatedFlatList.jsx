import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet } from 'react-native';
import { useLocalization } from 'localization';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { Styles } from 'styles';
import { stringOrNumberPropType, stylePropType } from 'proptypes';
import LoadingIndicator from './LoadingIndicator';
import QueryRefreshControl from './QueryRefreshControl';
import EduText from './EduText';

const PaginatedFlatList = ({
  paginatedReactQuery,
  paginatedReactQueryParams,
  reactQueryKey,
  renderItem,
  errorLocalizationKey,
  noItemsLocalizationKey,
  contentContainerStyle,
  hideNothingLeftToShow,
  onScroll,
  initialNumToRender,
  SkeletonComponent,
  ListEmptyComponent,
  maxNumOfItems,
  ...props
}) => {
  const { t } = useLocalization();
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = paginatedReactQuery(...paginatedReactQueryParams);
  const flatListItems = useMemo(
    () => data?.pages?.map((page) => page.data)?.flat() || [],
    [data]
  );

  if (isError) {
    return <EduText style={styles.error}>{t(errorLocalizationKey)}</EduText>;
  }
  return (
    <Animated.FlatList
      contentContainerStyle={contentContainerStyle}
      data={
        maxNumOfItems ? flatListItems.slice(0, maxNumOfItems) : flatListItems
      }
      onScroll={onScroll}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        !onScroll && (
          <QueryRefreshControl
            refetch={() => {
              queryClient.setQueryData(reactQueryKey, (oldData) => ({
                pageParams: [oldData.pageParams[0]],
                pages: [oldData.pages[0]],
              }));
              refetch();
            }}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        )
      }
      ListEmptyComponent={
        (isLoading && SkeletonComponent) ||
        ListEmptyComponent ||
        (() => (
          <EduText style={styles.noItems}>{t(noItemsLocalizationKey)}</EduText>
        ))
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      ListFooterComponent={
        isFetchingNextPage ? (
          <LoadingIndicator large style={styles.footerLoading} />
        ) : (
          !(
            hasNextPage ||
            hideNothingLeftToShow ||
            flatListItems.length === 0
          ) && (
            <EduText style={styles.nothingLeftToShow}>
              {t('FlatList/Nothing left to show')}
            </EduText>
          )
        )
      }
      initialNumToRender={initialNumToRender}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

PaginatedFlatList.propTypes = {
  paginatedReactQuery: PropTypes.func.isRequired,
  paginatedReactQueryParams: PropTypes.arrayOf(stringOrNumberPropType),
  reactQueryKey: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(stringOrNumberPropType).isRequired,
  ]).isRequired,
  renderItem: PropTypes.func.isRequired,
  errorLocalizationKey: PropTypes.string.isRequired,
  noItemsLocalizationKey: PropTypes.string,
  contentContainerStyle: stylePropType,
  hideNothingLeftToShow: PropTypes.bool,
  onScroll: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  initialNumToRender: PropTypes.number,
  SkeletonComponent: PropTypes.element,
  ListEmptyComponent: PropTypes.element,
  maxNumOfItems: PropTypes.number,
};
PaginatedFlatList.defaultProps = {
  paginatedReactQueryParams: [],

  contentContainerStyle: {},
  hideNothingLeftToShow: false,
  noItemsLocalizationKey: '',
  onScroll: undefined,

  initialNumToRender: 5,
  SkeletonComponent: null,
  ListEmptyComponent: null,
  maxNumOfItems: null,
};

export default PaginatedFlatList;

const styles = StyleSheet.create({
  error: {
    ...Styles.errorText,
    textAlign: 'center',
    flex: 1,
  },
  footerLoading: {
    paddingVertical: 5,
  },
  nothingLeftToShow: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  noItems: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
