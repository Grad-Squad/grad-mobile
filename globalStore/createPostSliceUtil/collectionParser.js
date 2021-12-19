import fileUploadTypes from 'constants/fileUploadTypes';
import materialTypes from 'constants/materialTypes';
import uriTypes from 'constants/uriTypes';

export default class CollectionParser {
  constructor(collection) {
    this.collection = collection;
  }

  parse() {
    switch (this.collection.materialType) {
      case materialTypes.MCQ:
        return this.parseMcqCollection();
      case materialTypes.Flashcards:
        return this.parseFlashcardsCollection();
      case materialTypes.URI:
        return this.parseUriCollection();
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
          prevUri: questionImage,
        })
      ),
      title: this.collection.title,
      type: materialTypes.MCQ,
      amount: this.collection.mcqs.length,
    };
  }

  parseFlashcardsCollection() {
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
      prevUri: this.collection.uris[0],
      fileName: this.collection.uris[0].key,
      fileUri: this.collection.uris[0].uri,
      type: materialTypes.PDF,
      amount: this.collection.uris.length,
    };
  }

  parseVideoCollection() {
    return {
      title: this.collection.title,
      prevUri: this.collection.uris[0],
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
