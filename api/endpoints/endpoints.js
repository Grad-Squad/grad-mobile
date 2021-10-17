export default Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
  },
  profile: {
    update: '/profiles/{0}',
  },
  posts: {
    create: 'posts/',
    post: 'posts/{0}',
    posts: 'posts',
    comments: 'posts/{0}/comments',
  },
});
