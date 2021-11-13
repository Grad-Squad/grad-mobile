// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useLocalization } from 'localization';
import DiscardChangesAlert from 'common/alerts/DiscardChangesAlert';
import useOnGoBack from './useOnGoBack';

/**
 * Wraps useOnGoBack & DiscardChangesAlert to simplify skipping showing an the alert, and dealing with user response if alert is shown
 *
 * @param {Function | boolean} shouldNotShow whether the alert should show, It can be either a boolean or a function that returns a boolean.
 * @param {Array} dependencies dependency list.
 * @param {Function} onDiscardConfirm callback for when the user confirms discarding current changes.
 * @param {Function} onDiscardDeny callback for when the user denies discarding current changes.
 *
 * @example
 * ```
 * useOnGoBackDiscardWarning(
 *  !formik.dirty || formik.isSubmitting,
 *  [formik.dirty, formik.isSubmitting]
 * );
 * ```
 */
export default (
  shouldNotShow,
  dependencies,
  onDiscardConfirm = undefined,
  onDiscardDeny = undefined
) => {
  const { t } = useLocalization();
  const navigation = useNavigation();

  return useOnGoBack((e) => {
    const shouldReturn =
      typeof shouldNotShow === 'boolean' ? shouldNotShow : shouldNotShow();
    if (shouldReturn) {
      return;
    }

    e.preventDefault();

    DiscardChangesAlert(
      t,
      () => {
        if (onDiscardConfirm) {
          onDiscardConfirm();
        }
        navigation.dispatch(e.data.action);
      },
      onDiscardDeny
    );
  }, dependencies);
};
