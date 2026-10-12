const { pathToFileURL } = require('url')

const input = String.raw`\\?\C:\Users\test\entry.js`

console.log(JSON.stringify(input))
console.log(pathToFileURL(input).href)
