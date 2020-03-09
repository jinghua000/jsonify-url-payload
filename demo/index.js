const { mixer, parser } = require('../dist/jsonify-url-payload.cjs')

const myURL = mixer('127.0.0.1', { a: 1, b: '2', c: [3], d: { e: '你好' } })

console.log(`====================`)
console.log(`mixed:`, myURL)
console.log(`====================`)
console.log(`parsed:`, parser(myURL))
console.log(`====================`)