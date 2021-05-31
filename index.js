// Flags: --expose-internals
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const tmpdir = {
  path: process.cwd()
};

const common = {
  isWindows: process.platform === 'win32'
};

let rimraf;
let rimrafSync;
function lazyLoadRimraf() {
  if (rimraf === undefined)
    ({ rimraf, rimrafSync } = require('./rimraf.js'));
}

function rm(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  lazyLoadRimraf();
  return rimraf(path, options, callback);
}

function rmSync(path, options) {
  lazyLoadRimraf();
  return rimrafSync(path, options);
}

let count = 0;
const nextDirPath = (name = 'rm') =>
  path.join(tmpdir.path, `${name}-${count++}`);

{
  // Check that deleting a file that cannot be accessed using rmsync throws
  // https://github.com/nodejs/node/issues/38683
  const dirname = nextDirPath();
  const filePath = path.join(dirname, 'text.txt');

  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(filePath, 'hello');

  fs.chmodSync(filePath, 0o444);
  fs.chmodSync(dirname, 0o444);

  rm(filePath, { force: true }, (err) => {
    try {
      fs.chmodSync(dirname, 0o777);
    } catch {
    }

    try {
      fs.chmodSync(filePath, 0o777);
    } catch {
    }

    let isValidState = true;
    const exists = fs.existsSync(filePath);

    if (common.isWindows && !(exists === true && err === null)) {
      // Since there is no concept of read-only folders on Windows, the
      // unlink syscall can easily get access to the files under the folder
      // being removed without an EACCES and remove them.
      isValidState = false;
    } else if (!(exists === true && err?.code === 'EACCES')) {
      isValidState = false;
    }

    if (!isValidState) {
      console.error(`1. ${err}`);
    }
  });
}

{
  // Check that deleting a file that cannot be accessed using rmsync throws
  // https://github.com/nodejs/node/issues/38683
  const dirname = nextDirPath();
  const filePath = path.join(dirname, 'text.txt');

  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(filePath, 'hello');

  fs.chmodSync(filePath, 0o444);
  fs.chmodSync(dirname, 0o444);

  let err = null;

  try {
    rmSync(filePath, { force: true });
  } catch (_err) {
    err = _err;
  }

  try {
    fs.chmodSync(dirname, 0o777);
  } catch {
  }

  try {
    fs.chmodSync(filePath, 0o777);
  } catch {
  }

  let isValidState = true;
  const exists = fs.existsSync(filePath);

  if (common.isWindows && !(exists === true && err === null)) {
    // Since there is no concept of read-only folders on Windows, the unlink
    // syscall can easily get access to the files under the folder being
    // removed without an EACCES and remove them.
    isValidState = false;
  } else if (!(exists === true && err?.code === 'EACCES')) {
    isValidState = false;
  }

  if (!isValidState) {
    console.error(`2. ${err}`);
  }
}

{
  // Check endless recursion.
  // https://github.com/nodejs/node/issues/34580
  const dirname = nextDirPath();
  fs.mkdirSync(dirname, { recursive: true });
  const root = fs.mkdtempSync(path.join(dirname, 'fs-'));
  const middle = path.join(root, 'middle');
  const leaf = path.join(middle, 'leaf');

  fs.mkdirSync(middle);
  fs.mkdirSync(leaf);

  fs.chmodSync(leaf, 0o555);
  fs.chmodSync(middle, 0o555);

  let err = null;

  try {
    rmSync(root, { recursive: true });
  } catch (_err) {
    err = _err;
  }

  try {
    fs.chmodSync(middle, 0o777);
  } catch {
  }

  try {
    fs.chmodSync(leaf, 0o777);
  } catch {
  }

  let isValidState = true;
  const exists = fs.existsSync(root);

  if (common.isWindows && !(exists === true && err?.code === 'EPERM')) {
    // Since there is no concept of read-only folders on Windows, the unlink
    // syscall can easily get access to the files under the folder being
    // removed without an EACCES and remove them.
    isValidState = false;
  } else if (!(exists === true && err?.code === 'EACCES')) {
    isValidState = false;
  }
  if (!isValidState) {
    console.error(`3. ${err}`);
  }
}

{
  // Check endless recursion.
  // https://github.com/nodejs/node/issues/34580
  const dirname = nextDirPath();
  fs.mkdirSync(dirname, { recursive: true });
  const root = fs.mkdtempSync(path.join(dirname, 'fs-'));
  const middle = path.join(root, 'middle');
  const leaf = path.join(middle, 'leaf');

  fs.mkdirSync(middle);
  fs.mkdirSync(leaf);

  fs.chmodSync(leaf, 0o555);
  fs.chmodSync(middle, 0o555);

  rm(root, { recursive: true }, (err) => {
    try {
      fs.chmodSync(middle, 0o777);
    } catch {
    }

    try {
      fs.chmodSync(leaf, 0o777);
    } catch {
    }

    let isValidState = true;
    const exists = fs.existsSync(root);

    if (common.isWindows && !(exists === true && err?.code === 'EPERM')) {
      // Since there is no concept of read-only folders on Windows, the
      // unlink syscall can easily get access to the files under the folder
      // being removed without an EACCES and remove them.
      isValidState = false;
    } else if (!(exists === true && err?.code === 'EACCES')) {
      isValidState = false;
    }

    if (!isValidState) {
      console.error(`4. ${err}`);
    }
  });
}
