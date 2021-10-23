import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';

/**
 * Set a handler for navigation beforeRemove.
 *
 * @param {Function} onNavBack navigation beforeRemove callback, receives event e.
 * @param {Array} onBackPress dependency list.
 *
 * @example
 * ```
 * OnGoBack(
 *   (e) => {
 *     if (!dirty) {
 *       return;
 *     }
 *
 *     e.preventDefault();
 *
 *     DiscardChangesAlert(t, () => navigation.dispatch(e.data.action));
 *   },
 *   [dirty]
 * );
 * ```
 */
export default (onNavBack, dependencies) => {
  const navigation = useNavigation();
  return useEffect(
    () => navigation.addListener('beforeRemove', onNavBack),
    dependencies
  );
};
