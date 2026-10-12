const { pathToFileURL } = require('bare-url')

const entry = '\\?\C:\Users\RUNNER~1\AppData\Local\Temp\entry.js'

console.log('input:', JSON.stringify(entry))
console.log(pathToFileURL(entry).href)
