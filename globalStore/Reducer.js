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
    case ReducerActions.addMCQ:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          materialList: [action.payload, ...state.createPost.materialList],
        },
      };
    case ReducerActions.setMCQQuestions:
      return {
        ...state,
        material: {
          ...state.material,
          mcqQuestions: action.payload,
        },
      };
    case ReducerActions.clearMaterialList:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          materialList: [],
        },
      };
    case ReducerActions.editMCQ: {
      const newState = { ...state }; // new object to trigger state update
      newState.createPost.materialList[action.payload.index] =
        action.payload.mcq;
      return newState;
    }
    default:
      return state;
  }
};

export default Reducer;
