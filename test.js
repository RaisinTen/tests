const os = require('bare-os')
const path = require('bare-path')
const { pathToFileURL } = require('bare-url')

const ordinary = 'C:\Users\RUNNER~1\AppData\Local\Temp\entry.js'
const extended = '\\?\C:\Users\RUNNER~1\AppData\Local\Temp\entry.js'

console.log('tmpdir:', JSON.stringify(os.tmpdir()))
console.log('resolve ordinary:', JSON.stringify(path.resolve(ordinary)))
console.log('resolve extended:', JSON.stringify(path.resolve(extended)))

for (const input of [ordinary, extended, os.tmpdir()]) {
  try {
    console.log(JSON.stringify(input), '=>', pathToFileURL(input).href)
  } catch (err) {
    console.error(JSON.stringify(input), '=> ERROR:', err.message)
  }
}

console.log(
  'resolve forward slashes:',
  JSON.stringify(
    path.resolve('C:/Users/RUNNER~1/AppData/Local/Temp/entry.js')
  )
)
