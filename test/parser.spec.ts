import { equals } from './shared'
import { mixer, parser } from '../src'

describe('test parser', () => {

  it('parser should parser the jsonify payload of url', () => {
    
    const params = { a: 123, b: '我', c: [null], d: { e: true } }
    const url = mixer('127.0.0.1', params)

    equals(parser(url), params) 

  })

  it('parser can parse some special symbol', () => {

    const params = { a: '!@#$%^&*(){}<>[]?|";:\\\'' }
    const url = mixer('127.0.0.1', params)

    equals(parser(url), params) 

  })

  it('parser can parse the key of object', () => {

    const params = { '我': '我' } 
    const url = mixer('127.0.0.1', params)

    equals(parser(url), params) 

  })

  it('parser should consider the unavailable values as undefined', () => {

    const url = '127.0.0.1?aa=aa'

    equals(parser(url), { aa: undefined })

  })

  it('parser should return empty object if no payload supplied', () => {

    const url = '127.0.0.1'

    equals(parser(url), {})

  })

  it('parser can parse the payload which is available even no encode', () => {

    const url = '127.0.0.1?a="我"&b={"a":123}'

    equals(parser(url), { a: '我', b: { a: 123 } })

  })

})