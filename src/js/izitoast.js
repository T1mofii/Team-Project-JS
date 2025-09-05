import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function noDataIzT(message) {
  if (message) {
    iziToast.show({
      title: '❌',
      message: `Sorry, there are no ${message}.`,
      color: '#764191',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      timeout: 5000,
    });
  }
}

export function errorApiIzT(error) {
  if (error.message) {
    iziToast.show({
      title: 'Error',
      color: '#764191',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      message: error.message,
      timeout: 5000,
    });
  }
}

export function successDataIzT(response) {
  if (response.data.message) {
    iziToast.success({
      message: response.data.message,
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      timeout: 5000,
    });
  }
}

export function successFeedback(message) {
  iziToast.show({
    title: '🎉 Success!',
    message: message,
    color: '#764191',          // зелёный
    position: 'topRight',
    timeout: 4000,
    progressBar: true,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    close: true,
    icon: '💌',
  });
}

export function errorFeedback(message) {
  iziToast.show({
    title: '❌ Error',
    message: message,
    color: '#764191',          // красный
    position: 'topRight',
    timeout: 5000,
    progressBar: true,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    close: true,
    icon: '⚠️',
  });
}

export function infoFeedback(message) {
  iziToast.show({
    title: 'ℹ️ Info',
    message: message,
    color: '#764191',          // синий
    position: 'topRight',
    timeout: 4000,
    progressBar: true,
    transitionIn: 'bounceInLeft',
    transitionOut: 'bounceOutRight',
    close: true,
    icon: '💡',
  });
}

export function warningFeedback(message) {
  iziToast.show({
    title: '⚠️ Warning',
    message: message,
    color: '#764191',          // жёлтый
    position: 'topRight',
    timeout: 4000,
    progressBar: true,
    transitionIn: 'flipInY',
    transitionOut: 'flipOutY',
    close: true,
    icon: '⚡',
  });
}
