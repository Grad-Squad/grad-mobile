import { deepCopy } from 'utility';

// eslint-disable-next-line import/prefer-default-export
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
