// @ts-ignore
// @ts-nocheck
export const showTouchKeyboard = () => {
  let apiElectron = window.electronAPI;
  if (apiElectron?.showTouchKeyboard()) {
    window.electronAPI.showTouchKeyboard();
  } else {
    const input = document.createElement("input");
    input.focus();
    setTimeout(() => input.remove(), 100);
  }
};
