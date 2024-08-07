import fileUploadTypes from 'constants/fileUploadTypes';
import materialTypes from 'constants/materialTypes';
import uriTypes from 'constants/uriTypes';

export default class MaterialParser {
  constructor(collection) {
    this.collection = collection;
  }

  parse() {
    switch (this.collection.materialType) {
      case materialTypes.MCQ:
        return this.parseMcqCollection();
      case materialTypes.Flashcards:
        return this.parseFlashcardsCollection();
      case materialTypes.PDF:
        return this.parsePdfCollection();
      case materialTypes.Images:
        return this.parseImageCollection();
      case materialTypes.Video:
        return this.parseVideoCollection();
      default:
        return null;
    }
  }

  static mapUriMaterialToUploadFile(uriMaterial, type) {
    return {
      file: { fileName: uriMaterial.key, uri: uriMaterial.uri },
      fileType: type,
      clientId: null,
    };
  }

  parseMcqCollection() {
    return {
      questions: this.collection.mcqs.map(
        ({ question, choices, answerIndices, questionImage }) => ({
          choices: choices.map((choice, index) => ({
            text: choice,
            isCorrect: answerIndices.indexOf(index) !== -1,
          })),
          question,
          questionImage:
            questionImage &&
            CollectionParser.mapUriMaterialToUploadFile(
              questionImage,
              fileUploadTypes.IMAGE
            ),
        })
      ),
      title: this.collection.title,
      type: materialTypes.MCQ,
      amount: this.collection.mcqs.length,
    };
  }

  parseFlashcardsCollection() {
    throw new Error();
    return this.collection;
  }

  parseUriCollection() {
    switch (this.collection.uris[0].type) {
      case uriTypes.IMAGE:
        return this.parseImageCollection();
      case uriTypes.PDF:
        return this.parsePdfCollection();
      case uriTypes.VIDEO:
        return this.parseVideoCollection();
      default:
        return null;
    }
  }

  parsePdfCollection() {
    return {
      title: this.collection.title,
      prevFile: CollectionParser.mapUriMaterialToUploadFile(
        this.collection.uris[0],
        fileUploadTypes.DOC
      ),
      fileName: this.collection.uris[0].key,
      fileUri: this.collection.uris[0].uri,
      type: materialTypes.PDF,
      amount: this.collection.uris.length,
    };
  }

  parseVideoCollection() {
    return {
      title: this.collection.title,
      prevFile: CollectionParser.mapUriMaterialToUploadFile(
        this.collection.uris[0],
        fileUploadTypes.VIDEO
      ),
      fileName: this.collection.uris[0].key,
      fileUri: this.collection.uris[0].uri,
      type: materialTypes.Video,
      amount: this.collection.uris.length,
    };
  }

  parseImageCollection() {
    return {
      title: this.collection.title,
      images: this.collection.uris,
      type: materialTypes.Images,
      amount: this.collection.uris.length,
    };
  }
}
