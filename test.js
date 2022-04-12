const { app, safeStorage } = require('electron');

(async () => {
  await app.whenReady();
  console.log(safeStorage.isEncryptionAvailable());
  console.log(safeStorage.encryptString("hello"));
})()
  .then(app.quit)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
