import path from "path";
import { app, ipcMain, screen, globalShortcut } from "electron";
import serve from "electron-serve";
import { createWindow, createBrowserView } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: Electron.BrowserWindow | null = null;
const browserViewCache = new Map<string, Electron.BrowserView>();

(async () => {
  await app.whenReady();

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = createWindow("main", {
    width: width,
    height: height,
    fullscreen: true,
    kiosk: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Register keyboard shortcuts to exit kiosk mode
  globalShortcut.register('F11', () => {
    if (mainWindow) {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });

  globalShortcut.register('Escape', () => {
    if (mainWindow && mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    }
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
  // Clean up cached BrowserViews
  browserViewCache.clear();
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

// Function to get or create cached BrowserView
const getBrowserView = (url: string): Electron.BrowserView => {
  if (browserViewCache.has(url)) {
    return browserViewCache.get(url)!;
  }
  const view = createBrowserView(mainWindow!, url);
  browserViewCache.set(url, view);
  return view;
};

// Listen for Spartan page request
ipcMain.on("show-spartan", () => {
  if (mainWindow) {
    const view = getBrowserView("https://bogor.imigrasi.go.id/");
    mainWindow.setBrowserView(view);
  }
});

// Listen for Map page request
ipcMain.on("show-map", () => {
  if (mainWindow) {
    const view = getBrowserView("https://map.monitoringmalaria.site");
    mainWindow.setBrowserView(view);
  }
});

ipcMain.on("navigate-home", () => {
  if (mainWindow) {
    // Remove BrowserView if exists, but keep cached
    if (mainWindow.getBrowserView()) {
      mainWindow.setBrowserView(null);
    }
    // mainWindow.loadURL("app://./home");
  }
});

ipcMain.handle("send-barcode", async (_event, barcode: string) => {
  try {
    const res = await fetch("https://nr.siege.id/api/zebrascanner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ barcode }),
    });

    return { success: true, status: res.status };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});
