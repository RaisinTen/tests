const { app, BrowserWindow, safeStorage } = require("electron");

(async () => {
  await app.whenReady();
  new BrowserWindow();
  console.log(safeStorage.isEncryptionAvailable());
  console.log(safeStorage.encryptString("hello"));
})()
  .then(app.quit)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
