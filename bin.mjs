import build from 'bare-build'

const argv = Bare.argv
console.log(argv)

const entry = argv[3] // './app.js'

const options = {
  hosts: [argv[1]],
  out: argv[2],
  standalone: true
}

for await (const resource of build(entry, null, options)) {
  console.log(resource)
}
