export const nativeEncode = encodeURIComponent
export const natvieDecode = decodeURIComponent

/**
 * Question Mark
 */ 
export const Q_MARK = '?'

/**
 * And Mark
 */
export const A_MARK = '&'

/**
 * Equal Mark
 */
export const E_MARK = '='

export function safeParse (str: string): any {
  try {
    return JSON.parse(str)
  } catch {
    return void 0
  }
}