// import { useInfiniteQuery, useMutation } from 'react-query';
// import { useAxios } from './axiosInstance';

// export default () => {
//   const axios = useAxios();

//   const createAccount = async ({ name, email, password }) =>
//     axios.post(`/auth/register`, {
//       user: {
//         email,
//         password,
//       },
//       profile: {
//         name,
//       },
//     });

//   const updateAccount = async (userInfo, profileId, headers) =>
//     // console.log(headers);
//     // console.log({
//     //   biography: userInfo?.bio,
//     //   role: 'teacher',
//     // });
//     // console.log('test');
//     // console.log(userInfo);
//     // console.log(profileId);
//     axios.patch(
//       `/profiles/${profileId}`,
//       {
//         biography: userInfo?.bio,
//         role: 'teacher',
//       },
//       {
//         headers: headers.headers,
//       }
//     );

//   return { createAccount, updateAccount };
// };
