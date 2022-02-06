import { deepCopy } from 'utility';

export const deleteItemInPages = (oldData, id) => {
  const copy = deepCopy(oldData);
  copy.pages.every((page) => {
    const deletedCommentIndex = page.data.findIndex((item) => item.id === id);
    if (deletedCommentIndex !== -1) {
      page.data.splice(deletedCommentIndex, 1);
      return false;
    }
    return true;
  });
  return copy;
};
export const replaceItemInPages = (oldData, id, newItem) => {
  const copy = deepCopy(oldData);
  copy.pages.every((page) => {
    const itemToUpdateIndex = page.data.findIndex((item) => item.id === id);
    if (itemToUpdateIndex !== -1) {
      page.data[itemToUpdateIndex] = newItem;
      return false;
    }
    return true;
  });
  return copy;
};
export const updateItemInPages = (oldData, id, callback) => {
  const copy = deepCopy(oldData);
  copy.pages.every((page) => {
    const itemToUpdateIndex = page.data.findIndex((item) => item.id === id);
    if (itemToUpdateIndex !== -1) {
      page.data[itemToUpdateIndex] = callback(page.data[itemToUpdateIndex]);
      return false;
    }
    return true;
  });
  return copy;
};

// https://stackoverflow.com/questions/7492921/how-can-i-implement-a-search-using-regex
export const searchUtil = (find, within) => {
  const filteredFind = find.replace(/[*+?^$.\[\]{}()|\\\/]/g, '\\$&');
  const phraseRegex = /"[^"]+"/g;
  let phrases = filteredFind.match(phraseRegex) || [];
  phrases = phrases.map((s) => s.replace(/"/g, ''));
  const words = filteredFind.replace(phraseRegex, '').split(/\s+/);
  const searchTerms = words.concat(phrases);
  const searchExpression = new RegExp(
    `(?=.*${searchTerms.join(')(?=.*')}).+`,
    'i'
  );
  return searchExpression.test(within);
};
