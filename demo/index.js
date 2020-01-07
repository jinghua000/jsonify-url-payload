const { mixer, parser } = require('../dist/jsonify-url-payload.cjs')

const url = mixer('127.0.0.1', { a: 123, b: '我我我', c: [1, 2, { num: 0 }] })

console.log(`====================`)
console.log(`mixed url:`, url)
console.log(`====================`)
console.log(`parsed url:`, parser(url))
console.log(`====================`)