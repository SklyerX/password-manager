const { contextBridge, ipcRenderer } = require("electron");

const ConnectorObject = {
  save: (values) => ipcRenderer.send("app/config", values),
  download: (values) => ipcRenderer.send("app/download", values),
  openWeb: () => ipcRenderer.send("app/web"),
};

contextBridge.exposeInMainWorld("electronAPI", ConnectorObject);
