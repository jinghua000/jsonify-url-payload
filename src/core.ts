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

export function mixer (url: string, params: object): string {
  const arr: string[] = []
  arr.push(url)

  if (!isEmpty(params)) {
    arr.push(Q_MARK)
    arr.push(encode(params))
  }

  return arr.join('')
}

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