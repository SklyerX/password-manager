const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const exec = require("child_process").exec;
const isDev = require("electron-is-dev");
const axios = require("axios");
const {
  saveBounds,
  savePosition,
  getWindowSettings,
  getWindowPosition,
} = require("./setting");
const fs = require("fs");
const os = require("os");
const Zipper = require("adm-zip");

require("@electron/remote/main").initialize();

function execute(command, callback) {
  exec(command, (error, stdout, stderr) => {
    callback(stdout);
  });
}

const createWindow = () => {
  const backendExists = fs.existsSync(
    `${os.homedir()}/Desktop/signature-backend`
  );

  if (backendExists) {
    execute(
      `cd ${os.homedir()}/Desktop/signature-backend/server && npm start`,
      (output) => {
        console.log(output);
      }
    );
  } else {
    console.log("Backend not found...");
    return 0;
  }

  const bounds = getWindowSettings();
  const position = getWindowPosition();
  // Create the browser window.
  const win = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    x: position[0],
    y: position[1],
    minHeight: 800,
    minWidth: 800,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../logo.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  const startURL = isDev
    ? `http://localhost:3000/`
    : `file://${path.join(__dirname, "../build/index.html")}`;

  // and load the index.html of the app.
  win.loadURL(startURL);
  // Open the DevTools.
  win.webContents.openDevTools();

  win.on("resized", () => saveBounds(win.getSize()));
  win.on("moved", () => savePosition(win.getPosition()));

  // Ipc
  ipcMain.on("app/download", (_, args) => {
    fs.writeFileSync(
      `${os.homedir()}/Desktop/passwords.json`,
      `{
        "Passwords": [${args}]
}`
    );
  });

  ipcMain.on("app/web", () => {
    shell.openExternal("https://github.com/SklyerX");
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
