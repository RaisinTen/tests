const { app, safeStorage } = require("electron");

console.log(safeStorage.isEncryptionAvailable());
console.log(safeStorage.encryptString("hello"));

app.quit();
