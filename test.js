const { app } = require('electron');

(async () => {
  await app.whenReady();
  console.log('Hello, world!');
})()
  .then(app.quit)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
