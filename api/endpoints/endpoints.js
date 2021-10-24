export default Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    facebookLogin: '/auth/facebook',
  },
  profile: {
    update: '/profiles/{0}',
  },
  posts: {
    post: '/posts/{0}',
    comments: '/posts/{0}/comments',
    commentsPaginated: '/posts/{0}/comments?page={1}&limit={2}',
    ratings: '/posts/{0}/ratings/{1}',
    create: 'posts/',
    posts: 'posts',
  },
  comments: {
    ratings: '/comments/{0}/ratings/{1}',
  },
});
