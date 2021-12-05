export default Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    facebookLogin: '/auth/facebook',
  },
  profile: {
    update: '/profiles/{0}',
    followers: '/profiles/{0}/followers',
  },
  posts: {
    post: '/posts/{0}',
    comments: '/posts/{0}/comments',
    commentsByID: '/posts/{0}/comments/{1}',
    commentsPaginated: '/posts/{0}/comments?page={1}&limit={2}',
    ratings: '/posts/{0}/ratings/{1}',
    create: 'posts/',
    posts: 'posts',
  },
  comments: {
    ratings: '/comments/{0}/ratings/{1}',
  },
  s3: {
    getOneUploadLink: '/s3/upload',
    getManyUploadLinks: '/s3/upload?numberOfLinks={0}',
    uploadFile: 'https://s3.eu-central-1.amazonaws.com/educate-awesome-test',
    getFileUri: '/s3/get/{0}',
  },
});
