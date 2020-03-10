import { 
  nativeEncode, 
  natvieDecode, 
  safeParse, 
  Q_MARK, 
  A_MARK, 
  E_MARK 
} from './shared'

import { 
  isEmpty, 
  pipe, 
  split, 
  apply, 
  merge 
} from 'shadow-fns'

const mergeArray: (args: object[]) => object = apply(merge)
const handleElementForURL: (str: string) => object = pipe(
  split(E_MARK), 
  (arr: string[]) => ({
    [natvieDecode(arr[0])]: safeParse(natvieDecode(arr[1]))
  })
)

/**
 * Mixer jsonified payload to supplied URL,
 * will remain the types of payloads.
 * 
 * @param {string} url 
 * @param {object} params 
 * @returns {string}
 * @example
 * 
 * mixer('127.0.0.1', { a: 1, b: '2', c: [3], d: { e: '你好' } })
 * // => 127.0.0.1?a=1&b=%222%22&c=%5B3%5D&d=%7B%22e%22%3A%22%E4%BD%A0%E5%A5%BD%22%7D
 */
export function mixer (url: string, params: object): string {
  const arr: string[] = []
  arr.push(url)

  if (!isEmpty(params)) {
    arr.push(Q_MARK)
    arr.push(encode(params))
  }

  return arr.join('')
}

/**
 * Parse the jsonfied payload URL and return the payload.
 * 
 * @param {string} url 
 * @returns {object}
 * @example
 * 
 * const myURL = mixer('127.0.0.1', { a: 1, b: '2', c: [3], d: { e: '你好' } })
 * parser(myURL) // => { a: 1, b: '2', c: [3], d: { e: '你好' } }
 */
export function parser (url: string): object {
  const str = url.split(Q_MARK)[1] || ''

  return decode(str)
}

function encode (params: object): string {
  return Object.keys(params).map(
    key => [
      nativeEncode(key), 
      E_MARK, 
      nativeEncode(JSON.stringify(params[key]))
    ].join('')
  ).join(A_MARK)
}

function decode (str: string): object {
  if (!str) return {}

  const paramsArr: object[] = str.split(A_MARK).map(handleElementForURL)

  return mergeArray(paramsArr)
}