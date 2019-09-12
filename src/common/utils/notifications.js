import { store } from 'react-notifications-component';

const defaultNotification = (title, message, type) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 2500,
      onScreen: true
    }
  });
};

const showNotificaction = {
  success: (title, message) => defaultNotification(title, message, 'success'),
  warning: (title, message) => defaultNotification(title, message, 'warning'),
  error: (title, message) => defaultNotification(title, message, 'danger')
};

export default showNotificaction;
