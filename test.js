const { app, BrowserWindow, safeStorage } = require('electron');
const { setTimeout: setTimeoutPromises } = require('timers/promises');

(async () => {
  await app.whenReady();
  new BrowserWindow();
  await setTimeoutPromises(10000);
  // console.log(safeStorage.isEncryptionAvailable());
  // console.log(safeStorage.encryptString("hello"));
})()
  .then(app.quit)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
