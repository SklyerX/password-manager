const Store = require("electron-store");
const store = new Store();

function getWinPosition() {
  const default_positon = [304, 373];

  const position = store.get("window-position");

  if (position) return position;
  else {
    store.set("window-position", default_positon);
  }
}

function savePosition(xny) {
  store.set("window-position", xny);
}

function getWinSettings() {
  const default_bounds = [1200, 800];

  const size = store.get("window-size");

  if (size) return size;
  else {
    store.set("window-size", default_bounds);
    return default_bounds;
  }
}

function saveBounds(bounds) {
  store.set("window-size", bounds);
}

module.exports = {
  getWindowSettings: getWinSettings,
  saveBounds: saveBounds,
  getWindowPosition: getWinPosition,
  savePosition: savePosition,
};
