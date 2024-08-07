import BaseAlert from './BaseAlert';

/**
 * Shows Lose Progress Alert.
 *
 * @param {Function} t i18n translate function.
 * @param {Function} [onConfirm=()=>{}] On user confirm callback.
 * @param {Function} [onReject=()=>{}] On user reject callback.
 *
 * @example
 * ```
 * LoseProgressAlert(t, () => console.log('CONFIRMED'))
 * ```
 */
export default (t, onConfirm, onReject) => {
  BaseAlert(t, 'Lose Progress?', onConfirm, onReject);
};
