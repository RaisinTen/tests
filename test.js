const path = require('bare-path')
const { pathToFileURL } = require('bare-url')

const ordinary = 'C:/Users/RUNNER~1/AppData/Local/Temp/entry.js'
const namespaced = path.toNamespacedPath(ordinary)

console.log('namespaced:', JSON.stringify(namespaced))

try {
  console.log(pathToFileURL(namespaced).href)
} catch (err) {
  console.error('ERROR:', err.code, err.message)
}
