import BaseAlert from './BaseAlert';

/**
 * Shows Discard Changes Alert.
 *
 * @param {Function} t i18n translate function.
 * @param {Function} [onConfirm=()=>{}] On user confirm callback.
 * @param {Function} [onReject=()=>{}] On user reject callback.
 *
 * @example
 * ```
 * DiscardChangesAlert(t, () => console.log('CONFIRMED'))
 * ```
 */
export default (t, onConfirm, onReject) => {
  BaseAlert(t, 'Discard?', onConfirm, onReject);
};
