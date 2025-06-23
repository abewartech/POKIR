import path from "path";
import { app, ipcMain, screen } from "electron";
import serve from "electron-serve";
import { createWindow, createBrowserView } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: Electron.BrowserWindow | null = null;

(async () => {
  await app.whenReady();

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = createWindow("main", {
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

// Listen for Spartan page request
ipcMain.on("show-spartan", () => {
  if (mainWindow) {
    createBrowserView(mainWindow);
  }
});
