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
export declare function mixer(url: string, params: object): string;
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
export declare function parser(url: string): object;
