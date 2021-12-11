import BaseAlert from "common/alerts/BaseAlert";


/**
 * Shows Discard Question Alert.
 *
 * @param {Function} t i18n translate function.
 * @param {Function} [onConfirm=()=>{}] On user confirm callback.
 * @param {Function} [onReject=()=>{}] On user reject callback.
 *
 * @example
 * ```
 * CommentDeletionAlert(t, () => console.log('CONFIRMED'))
 * ```
 */
export default (t, onConfirm, onReject) => {
  BaseAlert(t, 'Confirm Comment Deletion?', onConfirm, onReject);
};