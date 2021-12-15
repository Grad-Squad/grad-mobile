import React from 'react';
import { render } from '@testing-library/react-native';
import AuthorInfo from 'components/ExpandedPost/ExpandedPostContent/AuthorInfo';

it.each([{ uri: 'https://picsum.photos/200/300' }, null])(
  'should match snapshot when profilePicture=%s',
  (profilePicture) => {
    const authorInfo = render(
      <AuthorInfo profilePicture={profilePicture} name="name" profileId={1} />
    );
    expect(authorInfo.toJSON()).toMatchSnapshot();
  }
);
