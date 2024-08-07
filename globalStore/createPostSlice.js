import { createSlice } from '@reduxjs/toolkit';
import materialTypes from 'constants/materialTypes';
import uriTypes from 'constants/uriTypes';
import CollectionParser from './createPostSliceUtil/collectionParser';

// ! mksl 2a2ra bas probs kinda outdated
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
    materialType: materialTypes.MCQ,
    title,
    mcqs: questions.map(({ question, choices, questionImage, prevUri }) => {
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
      } else if (prevUri) {
        mappedQuestion.questionImage = prevUri;
      }
      return mappedQuestion;
    }),
  },
  fileUploads: questions.map(({ questionImage }) => questionImage),
});

const parseFlashcardsMaterial = (
  { flashcards, title },
  fileUploadClientIdToResourceId
) => ({
  material: {
    materialType: materialTypes.Flashcards,
    title,
    flashcards: flashcards.map(
      ({
        frontText,
        backText,
        frontImage,
        backImage,
        prevFrontImageUri,
        prevBackImageUri,
      }) => {
        const mappedFlashcard = {
          frontText,
          backText,
        };
        if (frontImage?.clientId) {
          mappedFlashcard.frontImage = {
            key: fileUploadClientIdToResourceId[frontImage.clientId],
            type: 'image',
          };
        } else if (frontImage && prevFrontImageUri) {
          mappedFlashcard.frontImage = prevFrontImageUri;
        }
        if (backImage?.clientId) {
          mappedFlashcard.backImage = {
            key: fileUploadClientIdToResourceId[backImage.clientId],
            type: 'image',
          };
        } else if (backImage && prevBackImageUri) {
          mappedFlashcard.backImage = prevBackImageUri;
        }
        return mappedFlashcard;
      }
    ),
  },
  // fileUploads: questions.map(({ questionImage }) => questionImage),
});

const parseUriMaterial = (
  { title, file, prevUri, files },
  fileUploadClientIdToResourceId,
  uriType
) => {
  let uris = [];
  if (files) {
    uris = files.map((fileIter) =>
      fileIter?.clientId
        ? {
            key: fileUploadClientIdToResourceId[fileIter.clientId],
            type: uriType,
          }
        : fileIter?.file?.prevUri
    );
  } else {
    uris = file?.clientId
      ? [
          {
            key: fileUploadClientIdToResourceId[file.clientId],
            type: uriType,
          },
        ]
      : [prevUri];
  }
  const material = {
    materialType: materialTypes.URI,
    title,
    uris,
  };

  return { material };
  // fileUploads: questions.map(({ questionImage }) => questionImage),
};

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
        .map((collection) => new CollectionParser(collection).parse())
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
            case materialTypes.PDF:
              return material?.file?.clientId ? material?.file : null;
            case materialTypes.Images:
              return material?.files
                ?.map((file) => (file?.clientId ? file : null))
                ?.flat()
                ?.filter((elm) => !!elm);
            case materialTypes.Video:
              return material?.file?.clientId ? material?.file : null;
            case materialTypes.Flashcards:
              return material.flashcards
                .map(({ frontImage, backImage }) =>
                  [
                    frontImage?.clientId ? frontImage : null,
                    backImage?.clientId ? backImage : null,
                  ].filter((elm) => elm != null)
                )
                .flat()
                .filter((elm) => !!elm);
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
          case materialTypes.Flashcards:
            parsedMaterial = parseFlashcardsMaterial(
              material,
              fileUploadClientIdToResourceId
            );
            return parsedMaterial.material;
          case materialTypes.PDF:
            parsedMaterial = parseUriMaterial(
              material,
              fileUploadClientIdToResourceId,
              uriTypes.PDF
            );
            return parsedMaterial.material;
          case materialTypes.Video:
            parsedMaterial = parseUriMaterial(
              material,
              fileUploadClientIdToResourceId,
              uriTypes.VIDEO
            );
            return parsedMaterial.material;
          case materialTypes.Images:
            parsedMaterial = parseUriMaterial(
              material,
              fileUploadClientIdToResourceId,
              uriTypes.IMAGE
            );
            return parsedMaterial.material;
          default:
            return null;
        }
      });

      state.post = {
        title,
        priceInCents: 0,
        subject: { content: subject },
        tags: tags.map((tag) => ({ content: tag })),
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
            case materialTypes.PDF:
            case materialTypes.Video:
              if (materialToDelete?.prevUri) {
                fileKeysToDelete = [
                  materialToDelete?.prevUri?.key?.split('/').pop(),
                ];
              }
              break;
            case materialTypes.Images:
              if (materialToDelete?.prevUri) {
                fileKeysToDelete = materialToDelete.files
                  .map((file) => file?.prevUri?.key)
                  .filter((elm) => !!elm);
              }
              break;
            case materialTypes.Flashcards:
              fileKeysToDelete = materialToDelete
                .map(({ prevFrontImageUri, prevBackImageUri }) => [
                  prevFrontImageUri?.key ? prevFrontImageUri?.key : null,
                  prevBackImageUri?.key ? prevBackImageUri?.key : null,
                ])
                .flat()
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
