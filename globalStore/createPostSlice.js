import { createSlice } from '@reduxjs/toolkit';
import materialTypes from 'constants/materialTypes';

// current plan:
// formik post form
// dispatch parse file uploads => set state file uploads array
//   [{clientId, file, fileType}]
// use query get links, use mutation upload?
// on mutation success dispatch addFileUploadId: clientId => uploadId
// uploads finished
// dispatch parse post => state.post = p, state.isPostReady = true
// mutation upload post

const parseMcqMaterial = (
  { questions, title },
  fileUploadClientIdToResourceId
) => ({
  material: {
    materialType: 'mcq',
    title,
    mcqs: questions.map(({ question, choices, questionImage }) => ({
      question,
      answerIndices: choices
        .map(({ isCorrect }, index) => (isCorrect ? index : -1))
        .filter((i) => i !== -1),
      choices: choices.map(({ text }) => text),
      questionImage: {
        key: fileUploadClientIdToResourceId[questionImage.clientId],
        type: 'image',
      },
    })),
  },
  fileUploads: questions.map(({ questionImage }) => questionImage),
});

const initialState = {
  materialList: [],
  post: {},
  fileUploads: [],
  fileUploadClientIdToResourceId: {},
  areFileUploadsReady: false,
  isPostReadyForParsing: false,
  isPostReadyForUpload: false,
  numUploadedFiles: 0,
};
export const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    clearCreatePost: (state) => {
      Object.assign(state, initialState);
    },
    clearMaterialList: (state) => {
      state.materialList = [];
    },
    setCreateMaterialItem: (state, action) => {
      state.materialList = action.payload;
    },
    addCreateMaterialItem: (state, action) => {
      state.materialList.unshift(action.payload);
    },
    replaceCreateMaterialItem: (state, action) => {
      state.materialList[action.payload.index] = action.payload.material;
    },
    addFileUploadId: (state, action) => {
      state.fileUploadClientIdToResourceId[action.payload.clientId] =
        action.payload.resourceId;
      state.numUploadedFiles = Object.keys(
        state.fileUploadClientIdToResourceId
      ).length;
    },
    parseFileUploads: (state) => {
      state.fileUploads = state.materialList
        .map((material) => {
          switch (material.type) {
            case materialTypes.MCQ:
              return material.questions.map(
                ({ questionImage }) => questionImage
              );
            default:
              return null;
          }
        })
        .flat()
        .filter((elm) => elm != null);
      state.areFileUploadsReady = true;
    },
    parsePost: (state, action) => {
      const {
        data: { title, subject, tags, materialList },
        fileUploadClientIdToResourceId,
      } = action.payload;

      const postMaterials = materialList.map((material) => {
        let parsedMaterial;
        switch (material.type) {
          case materialTypes.MCQ:
            parsedMaterial = parseMcqMaterial(
              material,
              fileUploadClientIdToResourceId
            );
            return parsedMaterial.material;
          default:
            return null;
        }
      });

      state.post = {
        title,
        priceInCents: 0,
        subject,
        materials: postMaterials,
      };
      state.isPostReadyForUpload = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearCreatePost,
  clearMaterialList,
  setCreateMaterialItem,
  addCreateMaterialItem,
  replaceCreateMaterialItem,
  parsePost,
  parseFileUploads,
  addFileUploadId,
} = createPostSlice.actions;

export default createPostSlice.reducer;
