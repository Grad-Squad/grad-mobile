import { useInfiniteQuery } from 'react-query';
import { useAxios } from 'api/AxiosProvider';
import { formatString } from 'utility';
import endpoints from './endpoints';

export const getFollowersKey = 'profileFollowers';
export const useAPIGetProfileFollowers = (profileId) => {
  const { axios } = useAxios();
  return useInfiniteQuery(
    [getFollowersKey, profileId],
    ({ pageParam = 1 }) => {
      // const { data } = await axios.get(
      //   formatString(endpoints.profile.followers, profileId),
      //   {
      //     params: {
      //       page: pageParam,
      //       limit: 10,
      //     },
      //   }
      // );
      // return data;
      const profiles = [];
      for (let i = 0; i < 20; i++) {
        profiles.push({
          id: i,
          createdAt: '2021-09-26T17:49:56.650Z',
          updatedAt: '2021-11-14T14:50:32.584Z',
          name: `Sameh Initial${i}`,
          role: 'student',
          profilePicture:
            'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
          isFollowed: Math.random() > 0.5,
        });
      }
      return {
        data: profiles,
        count: 20,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
        lastPage: null,
      };
    },
    { getNextPageParam: (lastPage) => lastPage.nextPage }
  );
};
