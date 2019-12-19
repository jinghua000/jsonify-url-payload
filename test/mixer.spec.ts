import { eq } from './shared'
import { mixer } from '../src'
import { nativeEncode } from '../src/shared'

const encode = (payload: any): string => nativeEncode(JSON.stringify(payload))

describe('test mixer', () => {

  it('mixer should mix jsonify params to url', () => {
    
    const params = { a: 123, b: '我', c: [null], d: { e: true } }

    eq(
      mixer('127.0.0.1', params),
      `127.0.0.1?a=123&b=${encode(params.b)}&c=${encode(params.c)}&d=${encode(params.d)}`
    ) 

  })

  it('mixer can mix some special symbol', () => {

    const params = { a: '!@#$%^&*(){}<>[]?|";:\\\'' }

    eq(
      mixer('127.0.0.1', params),
      `127.0.0.1?a=${encode(params.a)}`
    )

  })

  it('mixer can mix key of object', () => {

    const params = { '我': '我' } 

    eq(
      mixer('127.0.0.1', params),
      `127.0.0.1?${nativeEncode('我')}=${encode('我')}`
    )

  })

  it('mixer will not add any payload if supplied object is empty', () => {

    eq(
      mixer('127.0.0.1', {}),
      '127.0.0.1'
    )

  })

})