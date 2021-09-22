import ReducerActions from './ReducerActions';

const Reducer = (state, action) => {
  switch (action.type) {
    case ReducerActions.addMCQ:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          materialList: [
            action.payload,
            ...(state.createPost.materialList || []),
          ],
        },
      };
    default:
      return state;
  }
};

export default Reducer;
