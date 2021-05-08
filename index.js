const fs = require('fs');

const devnull = process.platform === 'win32' ? '\\\\.\\nul' : '/dev/null';
console.log(`devnull: "${devnull}"`);

const fd = fs.openSync(devnull, 'r+');
console.log(fd);
const stats = fs.fstatSync(fd);
console.log(stats);

fs.closeSync(fd);
