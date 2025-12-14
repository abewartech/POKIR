import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { app, ipcMain, screen, globalShortcut } from "electron";
import serve from "electron-serve";
import { createWindow, createBrowserView } from "./helpers";
import WebSocket from "ws";

const isProd = process.env.NODE_ENV === "production";

/* ================= PRINTER CONFIG ================= */

const PRINTER_NAME = "\\\\localhost\\POS-80C";
const LINE_WIDTH = 48;
const WS_URL = "wss://nr.siege.id/ws/handleprint";
const CLIENT_ID = `electron-01`;

/* ================= HELPERS ================= */

function centerText(text: string) {
  text = text.trim();
  if (text.length > LINE_WIDTH) text = text.substring(0, LINE_WIDTH);
  const space = Math.floor((LINE_WIDTH - text.length) / 2);
  return " ".repeat(space) + text;
}

function generateContent(data: any) {
  return [
    centerText("Kantor Imigrasi Kelas I Non TPI"),
    centerText("Bogor"),
    "=".repeat(LINE_WIDTH),
    centerText("NOMOR ANTRIAN"),
    centerText(`[ ${data.queue_number ?? "--"} ]`),
    "=".repeat(LINE_WIDTH),
    `Tanggal : ${data.date ?? ""}`,
    `Nama    : ${data.name ?? ""}`,
    `Tujuan  : ${data.purpose ?? ""}`,
    "=".repeat(LINE_WIDTH),
    "", "", "", "", "", "", "",
  ].join("\n");
}

function printViaCopy(data: any) {
  try {
    let content = generateContent(data);
    content += "\n" + String.fromCharCode(29, 86, 0); // ESC/POS CUT

    const filePath = path.join(app.getPath("temp"), "printout.txt");
    fs.writeFileSync(filePath, content, "utf8");

    exec(`cmd.exe /c copy /b "${filePath}" ${PRINTER_NAME}`, (err) => {
      if (err) {
        console.error("❌ Print failed:", err.message);
        return;
      }
      console.log("✅ Printed successfully");
    });
  } catch (err) {
    console.error("❌ Print error:", err);
  }
}

/* ================= WEBSOCKET ================= */

let wsClient: WebSocket | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

function connectWebSocket() {
  wsClient = new WebSocket(WS_URL);

  wsClient.on("open", () => {
    console.log("🔌 WebSocket connected");
  });

  wsClient.on("message", async (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      console.log("📩 Print job received:", data);

      // Request lock
      const lockRes = await fetch("https://bogorimigrasi.net/api/print-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          queue_id: data.queue_id,
          client_id: CLIENT_ID
        })
      });

      const lockData = await lockRes.json();
      if (lockData.lockGranted) {
        printViaCopy(data);
      } else {
        console.log("❌ Lock not granted, skipping print");
      }
    } catch (err) {
      console.error("❌ Invalid WS data or lock error:", err);
    }
  });

  wsClient.on("close", reconnectWS);
  wsClient.on("error", reconnectWS);
}

function reconnectWS() {
  if (reconnectTimeout) return;
  console.log("🔄 Reconnecting WebSocket...");
  reconnectTimeout = setTimeout(() => {
    reconnectTimeout = null;
    connectWebSocket();
  }, 3000);
}

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: Electron.BrowserWindow | null = null;
const browserViewCache = new Map<string, Electron.BrowserView>();

(async () => {
  await app.whenReady();

  connectWebSocket(); // 🔥 AUTO PRINT STARTS HERE

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
  wsClient?.close();
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

ipcMain.handle("send-barcode", async (_e, barcode: string) => {
  try {
    const res = await fetch("https://nr.siege.id/api/zebrascanner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode }),
    });
    return { ok: true, status: res.status };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
});
