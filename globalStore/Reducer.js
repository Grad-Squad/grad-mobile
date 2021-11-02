import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import ReducerActions from './ReducerActions';

const setProfileIdInStorage = async (profileId) =>
  AsyncStorage.setItem(localStorageKeys.profileId, profileId);

const Reducer = (state, action) => {
  switch (action.type) {
    case ReducerActions.alterImageInUploadQueue: {
      const newQueue = state.imagesUploadQueue.map((payload) =>
        payload?.payload?.key === action.payload?.key
          ? {
              payload: {
                ...payload.payload,
                file: {
                  uri: action.payload?.image.uri,
                  name: action.payload?.image.fileName,
                  type: 'image/jpeg',
                },
              },
            }
          : payload
      );
      return {
        ...state,
        imagesUploadQueue: newQueue,
      };
    }
    case ReducerActions.removeLastXFromUploadQueue:
      return {
        ...state,
        imagesUploadQueue: state.imagesUploadQueue.slice(
          0,
          state.imagesUploadQueue.length - action.payload
        ),
      };
    case ReducerActions.removeImageFromUploadQueue:
      return {
        ...state,
        imagesUploadQueue: state.imagesUploadQueue.filter(
          (payload) => payload?.payload?.key !== action.payload
        ),
      };
    case ReducerActions.clearImageUploadQueue:
      return {
        ...state,
        imagesUploadQueue: [],
      };
    case ReducerActions.addImageToUploadQueue:
      return {
        ...state,
        imagesUploadQueue: [...state.imagesUploadQueue, action.payload],
      };
    case ReducerActions.popImageFromUploadQueue:
      return {
        ...state,
        imagesUploadQueue: state.imagesUploadQueue.slice(1),
      };
    case ReducerActions.setProfileId:
      setProfileIdInStorage(action.payload.toString());
      return {
        ...state,
        profileId: action.payload,
      };
    case ReducerActions.setMCQs:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          materialList: [...action.payload],
        },
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
