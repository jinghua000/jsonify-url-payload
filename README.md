# jsonify-url-payload

## Introduction

Mix jsonify payload to URL.

Parse jsonify payload from URL.

## Install

Node:

```bash
npm i -D jsonify-url-payload
```

Browser:

```html
<script src="./dist/jsonify-url-payload.umd.min.js"></script>
```

## Usage

Import in Node(es):

```js
import { mixer, parser } from 'jsonify-url-payload'
```

Import in Browser:

```js
const { mixer, parser } = jsonifyURL
```

Then

```js
const myURL = mixer('127.0.0.1', { a: 1, b: '2', c: [3], d: { e: '你好' } })
// => 127.0.0.1?a=1&b=%222%22&c=%5B3%5D&d=%7B%22e%22%3A%22%E4%BD%A0%E5%A5%BD%22%7D

const myPayload = parser(myURL)
// => { a: 1, b: '2', c: [3], d: { e: '你好' } }
```

See also [test cases](./test/README.md).