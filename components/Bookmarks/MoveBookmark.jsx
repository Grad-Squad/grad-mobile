import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from 'globalStore/GlobalStore';
import { routeParamPropType } from 'proptypes';
import Page from 'common/Page/Page';
import BookmarksList from './BookmarksList';

const MoveBookmark = ({ route }) => {
  const { postId, bookmarkId, folderId } = route.params;
  const [state] = useStore();
  return (
    <Page>
      <BookmarksList
        profileId={state.profileId}
        postId={postId}
        fromBookmarkId={bookmarkId}
        folderId={folderId}
      />
    </Page>
  );
};

MoveBookmark.propTypes = {
  route: routeParamPropType(
    PropTypes.shape({
      postId: PropTypes.number,
      bookmarkId: PropTypes.number.isRequired,
      folderId: PropTypes.number,
    }).isRequired
  ).isRequired,
};
MoveBookmark.defaultProps = {};

export default MoveBookmark;
