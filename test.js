const fs = require('fs');

console.log(fs.statSync('C:\\Windows'));
fs.chmodSync('C:\\Windows', 0o000);
console.log(fs.statSync('C:\\Windows'));

console.log(fs.statSync('C:\\Windows'));
fs.chmodSync('C:\\Windows', 0o777);
console.log(fs.statSync('C:\\Windows'));
