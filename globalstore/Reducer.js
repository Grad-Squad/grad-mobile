import ReducerActions from './ReducerActions';

const Reducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default Reducer;
