import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

// contextBridge.exposeInMainWorld('electronAPI', {
//   showTouchKeyboard: () => ipcRenderer.send('show-touch-keyboard'),
//   isElectron: true // Flag untuk deteksi environment
// });

contextBridge.exposeInMainWorld("ipc", handler);


export type IpcHandler = typeof handler;
