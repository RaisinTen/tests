const fs = require('fs');

const devnull = process.platform === 'win32' ? 'NUL' : '/dev/null';
console.log(`devnull: "${devnull}"`);

console.log(fs.existsSync(devnull));

const stats = fs.statSync(devnull);
console.log(stats);
