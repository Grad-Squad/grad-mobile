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
      page.data[itemToUpdateIndex] = newItem
      return false;
    }
    return true;
  });
  return copy;
};
