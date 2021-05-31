const fs = require('fs');
const path = require('path');

const cwdpath = process.cwd();
const dirpath = path.join(cwdpath, 'dir');
const midpath = path.join(dirpath, 'mid');
const filepath = path.join(midpath, 'file');

process.on('exit', () => {
  console.log(fs.readdirSync(cwdpath));
});

fs.mkdirSync(dirpath);
fs.mkdirSync(midpath);
fs.writeFileSync(filepath, 'hello');

fs.chmodSync(filepath, 0o000);
fs.chmodSync(midpath, 0o000);
fs.chmodSync(dirpath, 0o000);

let err = null;

try {
  console.log(fs.readdirSync(midpath));
} catch (_err) {
  err = _err;
}

try {
  fs.chmodSync(dirpath, 0o777);
} catch {
}

try {
  fs.chmodSync(midpath, 0o777);
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
