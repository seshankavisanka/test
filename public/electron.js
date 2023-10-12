const { app, BrowserWindow } = require("electron");

function createWindow() {
  // create the browser window
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // load the http://localhost:3000 of the app
  // mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadFile("./build/index.html");

  // open DevTools
  // mainWindow.webContents.openDevTools();
}

// this method will be called when Electron has finished
// initialization and is ready to create browser windows
// some APIs can only be used after this event occurs
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // on macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// quit when all windows are closed, except on macOS, there, it's common
// for application and their menu bar to stay active until the user quits
// explicitly with Cmd + Q
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
