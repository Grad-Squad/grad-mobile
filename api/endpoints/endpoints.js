export default Object.freeze({
  auth: {
    login: '/auth/login',
  },
  posts: {
    post:'/posts/{0}',
    comments: '/posts/{0}/comments',
    ratings: '/posts/{0}/ratings/{1}',
  },
  comments: {
    ratings: '/comments/{0}/ratings/{1}',
  },
});
