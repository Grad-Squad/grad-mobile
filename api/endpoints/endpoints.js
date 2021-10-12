export default Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  posts: {
    post: 'posts/{0}',
    comments: 'posts/{0}/comments',
  },
});
