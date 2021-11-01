import React from 'react';
import { render } from '@testing-library/react-native';
import AuthorInfo from 'components/ExpandedPost/ExpandedPostContent/AuthorInfo';

it.each(['https://picsum.photos/200/300', undefined])(
  'should match snapshot when profilePicture=%s',
  (profilePicture) => {
    const authorInfo = render(
      <AuthorInfo profilePicture={profilePicture} name="name" />
    );
    expect(authorInfo.toJSON()).toMatchSnapshot();
  }
);
