import { Alert } from 'react-native';


export default (t, tKey, onConfirm = () => {}, onReject = () => {}) => {
  Alert.alert(
    t(`Alerts/${tKey}/title`),
    t(`Alerts/${tKey}/message`),
    [
      {
        text: t(`Alerts/${tKey}/reject button`),
        style: 'cancel',
        onPress: onReject,
      },
      {
        text: t(`Alerts/${tKey}/confirm button`),
        style: 'destructive',
        onPress: onConfirm,
      },
    ]
  );
};
