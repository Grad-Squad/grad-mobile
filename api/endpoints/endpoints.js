export default Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    facebookLogin: '/auth/facebook',
    googleLogin: '/auth/google',
    forgotPassword: '/auth/forgot_password',
    verifyCode: '/auth/verify_code',
    changePassword: '/auth/change_password/{0}',
  },
  profile: {
    profileById: '/profiles/{0}',
    update: '/profiles/{0}',
    followers: '/profiles/{0}/followers',
    postsByProfileId: '/profiles/{0}/posts',
    followProfile: '/profiles/{0}/follow',
  },
  posts: {
    post: '/posts/{0}',
    comment: '/posts/{0}/comments/{1}',
    comments: '/posts/{0}/comments',
    commentByID: '/posts/{0}/comments/{1}',
    commentsPaginated: '/posts/{0}/comments?page={1}&limit={2}',
    ratings: '/posts/{0}/ratings/{1}',
    create: 'posts/',
    posts: 'posts',
  },
  comments: {
    ratings: '/comments/{0}/ratings/{1}',
  },
  s3: {
    getUploadImageLinks: '/s3/upload/image?numberOfLinks={0}',
    getUploadDocLinks: '/s3/upload/doc?numberOfLinks={0}',
    getUploadVideoLinks: '/s3/upload/video?numberOfLinks={0}',
    uploadFile: 'https://s3.eu-central-1.amazonaws.com/educate-awesome-test',
    getFileUri: '/s3/get/{0}',
    deleteUri: '/s3/{0}',
  },
  tags: {
    tags: '/tags',
  },
  subjects: {
    subjects: '/subjects',
    favoriteSubjects: '/subjects/favorites',
  },
  feedback: {
    feedback: '/feedback',
  },
});
