const { ipcRenderer } = window.require('electron');

export const showTouchKeyboard = () => {
  ipcRenderer.send('show-touch-keyboard');
};