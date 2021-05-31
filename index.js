const fs = require('fs');
const path = require('path');

const cwdpath = process.cwd();
const dirpath = path.join(cwdpath, 'dir');
const filepath = path.join(dirpath, 'file');

process.on('exit', () => {
  console.log(fs.readdirSync(cwdpath));
});

fs.mkdirSync(dirpath);
fs.writeFileSync(filepath, 'hello');

fs.chmodSync(filepath, 0o000);
fs.chmodSync(dirpath, 0o000);

let err = null;

try {
  console.log(fs.readdirSync(dirpath));
} catch (_err) {
  err = _err;
}

try {
  fs.chmodSync(dirpath, 0o777);
} catch {
}

try {
  fs.chmodSync(filepath, 0o777);
} catch {
}

try {
  fs.rmSync(dirpath, { recursive: true, force: true });
} catch {
}

if (err !== null) {
  throw err;
}
