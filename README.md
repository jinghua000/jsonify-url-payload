# jsonify-url-payload

[![Build Status](https://travis-ci.org/jinghua000/jsonify-url-payload.svg?branch=master)](https://travis-ci.org/jinghua000/jsonify-url-payload)
[![npm module](https://badge.fury.io/js/jsonify-url-payload.svg)](https://www.npmjs.com/package/jsonify-url-payload)
[![Coverage Status](https://coveralls.io/repos/github/jinghua000/jsonify-url-payload/badge.svg?branch=master)](https://coveralls.io/github/jinghua000/jsonify-url-payload?branch=master)
[![Dependency Status](https://david-dm.org/jinghua000/jsonify-url-payload.svg)](https://david-dm.org/jinghua000/jsonify-url-payload)

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

See also [test cases](https://github.com/jinghua000/jsonify-url-payload/blob/master/test/README.md).
