import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import ReducerActions from './ReducerActions';

const setProfileIdInStorage = async (profileId) =>
  AsyncStorage.setItem(localStorageKeys.profileId, profileId);

const Reducer = (state, action) => {
  switch (action.type) {
    case ReducerActions.setProfileId:
      setProfileIdInStorage(action.payload.toString());
      return {
        ...state,
        profileId: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
