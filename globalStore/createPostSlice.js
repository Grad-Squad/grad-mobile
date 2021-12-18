import { createSlice } from '@reduxjs/toolkit';
import { MaterialTypes } from 'constants';
import fileUploadTypes from 'constants/fileUploadTypes';
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
    materialType: MaterialTypes.MCQ,
    title,
    mcqs: questions.map(({ question, choices, questionImage }) => {
      const mappedQuestion = {
        question,
        answerIndices: choices
          .map(({ isCorrect }, index) => (isCorrect ? index : -1))
          .filter((i) => i !== -1),
        choices: choices.map(({ text }) => text),
      };
      if (questionImage?.clientId) {
        mappedQuestion.questionImage = {
          key: fileUploadClientIdToResourceId[questionImage.clientId],
          type: 'image',
        };
      } else if (questionImage?.file?.uri) {
        mappedQuestion.questionImage = {
          key: questionImage?.file?.uri?.split('/').pop(),
          type: 'image',
        };
      }
      return mappedQuestion;
    }),
  },
  fileUploads: questions.map(({ questionImage }) => questionImage),
});

const mapUriMaterialToUploadFile = (uriMaterial, type) => ({
  file: { fileName: uriMaterial.key, uri: uriMaterial.uri },
  fileType: type,
  clientId: null,
});

const parseMcqCollection = (collection) => ({
  questions: collection.mcqs.map(
    ({ question, choices, answerIndices, questionImage }) => ({
      choices: choices.map((choice, index) => ({
        text: choice,
        isCorrect: answerIndices.indexOf(index) !== -1,
      })),
      question,
      questionImage:
        questionImage &&
        mapUriMaterialToUploadFile(questionImage, fileUploadTypes.IMAGE),
    })
  ),
  title: collection.title,
  type: materialTypes.MCQ,
  amount: collection.mcqs.length,
});

const initialState = {
  materialList: [],
  post: {},
  fileUploads: [],
  deletedUris: [],
  areFileUploadsReady: false,
  isPostReadyForParsing: false,
  isPostReadyForUpload: false,
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
      const materials = action.payload;
      const parsedMaterials = materials
        .map((collection) => {
          switch (collection.materialType) {
            case materialTypes.MCQ:
              return parseMcqCollection(collection);
            default:
              return null;
          }
        })
        .filter((elm) => elm != null);
      state.materialList = parsedMaterials;
    },
    addCreateMaterialItem: (state, action) => {
      state.materialList.unshift(action.payload);
    },
    replaceCreateMaterialItem: (state, action) => {
      state.materialList[action.payload.index] = action.payload.material;
    },
    parseFileUploads: (state) => {
      state.fileUploads = state.materialList
        .map((material) => {
          switch (material.type) {
            case materialTypes.MCQ:
              return material.questions.map(({ questionImage }) =>
                questionImage?.clientId ? questionImage : null
              );
            default:
              return null;
          }
        })
        .flat()
        .filter((elm) => elm != null);
      state.areFileUploadsReady = true;
    },
    resetUploadState: (state) => {
      state.fileUploads = [];
      state.areFileUploadsReady = false;
      state.isPostReadyForParsing = false;
      state.isPostReadyForUpload = false;
    },
    resetAreFileUploadsReady: (state) => {
      state.areFileUploadsReady = false;
    },
    addToDeletedUris: (state, action) => {
      state.deletedUris.push(action.payload);
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
    deleteMaterials: (state, action) => {
      const indices = action.payload;
      while (indices.length) {
        const index = indices.pop();
        if (index > -1 && index < state.materialList.length) {
          let fileKeysToDelete = [];
          const materialToDelete = state.materialList[index];
          switch (materialToDelete.type) {
            case materialTypes.MCQ:
              fileKeysToDelete = materialToDelete.questions
                .map(
                  ({ questionImage }) =>
                    questionImage?.file?.uri?.split('/')?.pop() || null
                )
                .filter((elm) => elm != null);

              break;
            default:
          }
          state.deletedUris.push(...fileKeysToDelete);
          state.materialList.splice(index, 1);
        } else {
          console.log(
            '🚀 ~ file: createPostSlice.js ~ line 171 ~ ERROR: material list index(',
            index,
            ') is out of bounds'
          );
        }
      }
    },
  },
});

export const {
  clearCreatePost,
  clearMaterialList,
  setCreateMaterialItem,
  addCreateMaterialItem,
  replaceCreateMaterialItem,
  parsePost,
  parseFileUploads,
  addToDeletedUris,
  resetUploadState,
  resetAreFileUploadsReady,
  deleteMaterials,
} = createPostSlice.actions;

export default createPostSlice.reducer;
