(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.jsonifyURL = {}));
}(this, (function (exports) { 'use strict';

  var nativeEncode = encodeURIComponent;
  var natvieDecode = decodeURIComponent;
  /**
   * Question Mark
   */
  var Q_MARK = '?';
  /**
   * And Mark
   */
  var A_MARK = '&';
  /**
   * Equal Mark
   */
  var E_MARK = '=';
  function safeParse(str) {
      try {
          return JSON.parse(str);
      }
      catch (_a) {
          return void 0;
      }
  }

  /**
   * Similar to `f.curryN`
   * 
   * @see curryN
   */
  const _curryN = n => fn => {
    const curried = (...args) => 
      args.length < n
        ? (...args2) => curried(...args, ...args2)
        : fn(...args);
    return curried
  };

  /**
   * @see _curryN
   */
  const _curry2 = _curryN(2);

  /**
   * Use `Object.assign` to merge the objects passed and return a new object
   * 
   * **NOTE:** Not support prototype chain
   * 
   * **NOTE:** Shallow copy
   * 
   * @param  {...Object} args 
   * @return {Object}
   * @since 0.1.0
   * @category Object
   * @sign ({ k: a }, { k: b }, ..., { k: n }) -> { k: n }
   * @example
   * 
   * let obj1 = { a: 123 }
   * let obj2 = { b: 234 }
   * 
   * f.merge(obj1, obj2) // => { a: 123, b: 234 }
   */
  const merge = (...args) => Object.assign({}, ...args);

  /**
   * Check the tpye of element
   * 
   * Use `Object.prototype.toString`
   * 
   * @param {*} e 
   * @return {String}
   * @since 0.1.0
   * @category Tools
   * @sign x -> String
   * @see is
   * @example
   * 
   * f.type([]) // => Array
   * f.type({}) // => Object
   * f.type('') // => String
   */
  const type = e => Object.prototype.toString.call(e).replace(/^\[object\s(.*)\]$/, '$1');

  /**
   * Equal with `Object.keys`
   * 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
   * 
   * @param {Object} obj 
   * @return {Array}
   * @since 0.1.0
   * @category Native
   * @sign Object -> Array
   * @see values
   * @example
   * 
   * let obj = { a: 1, b: 2, c: 3 }
   * 
   * keys(obj) // => ['a', 'b', 'c']
   */
  const keys = Object.keys;

  /**
   * Check every element strict equal by `===`
   * 
   * Support `[]` and `{}`
   * 
   * Also `NaN` considered the same
   * 
   * **NOTE:** Not support prototype chain
   * 
   * @param {*} x 
   * @param {*} e 
   * @return {Boolean}
   * @since 0.1.0
   * @category Logic, curry2
   * @sign a -> b -> Boolean
   * @see eq
   * @example 
   *    
   * f.equals([1, 2, 3])([1, 2, 3]) // => true
   * f.equals([1, 2, 3])([1, 2, '3']) // => false
   * f.equals({ a: 123 })({ a: 123 }) // => true
   */
  const equals = _curry2((x, e) => {
    if (e === x) return true

    const t1 = type(e);
    const t2 = type(x);

    if (t1 === 'Array' && t2 === 'Array') {
      let length = e.length;

      if (length !== x.length) return false

      for (let i = 0; i < length; i++) {
        if (!equals(x[i])(e[i])) return false
      }

      return true
    }

    if (t1 === 'Object' && t2 === 'Object') {
      let _keys = keys(e);
      let length = _keys.length;

      if (length !== keys(x).length) return false

      for (let k of _keys) {
        if (!equals(x[k])(e[k])) return false
      }

      return true
    }

    return e !== e && x !== x
  });

  /**
   * Return a function like native method for itself
   * 
   * @param {String} fnName 
   * @return {Function}
   * @sign String -> Function
   * @see concat, includes, slice
   */
  const _nativeSelfFn = fnName => (...args) => data => data[fnName](...args);

  /**
   * Generate a left-to-right function pipe
   * 
   * One's returns considered as next's parameter
   * 
   * Except the first function, others should be unary
   * 
   * @param {...Function} fns 
   * @return {Function}
   * @since 0.1.0
   * @category Function
   * @sign (...a -> b, b -> c, ..., y -> z) -> (...a -> z)
   * @see pipeAsync
   * @example
   *    
   * // add 1 then multiply 2
   * let calc = f.pipe(f.add(1), f.multiply(2))
   * 
   * calc(1) // => 4
   * calc(3) // => 8
   */
  const pipe = (...fns) => fns.reduce(
    (acc, cur) => (...args) => cur(acc(...args))
  );

  /**
   * Check the element is equal with one of below
   * `undefined`, `null`, `''`, `[]`, `{}`
   * 
   * @param {*} e
   * @return {Boolean} 
   * @since 0.1.0
   * @category Tools
   * @sign x -> Boolean
   * @see isNil
   * @example
   * 
   * f.isEmpty({}) // => true
   * f.isEmpty('') // => true
   * f.isEmpty([undefined]) // => false
   */
  const isEmpty = e => [
    undefined, null, '', [], {}
  ].some(equals(e));

  /**
   * Just like `String.prototype.split`
   * 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split  
   * 
   * @param {String|RegExp} [separator]
   * @param {Number} [limit]
   * @param {String} str
   * @return {Array}
   * @since 0.1.0
   * @category Native
   * @sign (String | RegExp) -> String -> Array
   * @see join
   * @example
   * 
   * let str = 'i have a plan'
   * let splitWithBlank = f.split(' ')
   * 
   * splitWithBlank(str) // => ['i', 'have', 'a', 'plan']
   */
  const split = _nativeSelfFn('split');

  /**
   * Pass the first `n` parameters to supplied function and ignore others
   * 
   * @param {Number} n 
   * @param {Function} fn
   * @return {Function}
   * @since 0.1.0
   * @category Function, curry2
   * @see unary, binary
   * @sign Number -> ((a, b, ..., z) -> result) -> ((a, b, ..., n) -> result)
   * @example
   * 
   * let printThree = (a, b, c) => [a, b, c]
   * printThree(1, 2, 3) // => [1, 2, 3]
   * 
   * let printTwo = f.nAry(2)(printThree)
   * printTwo(1, 2, 3) // => [1, 2, undefined]
   */
  const nAry = _curry2((n, fn) => (...args) => fn(...args.slice(0, n)));

  /**
   * Pass the first parameters to supplied function and ignore others
   * 
   * @param {Function} fn
   * @return {Function}
   * @since 0.1.0
   * @category Function
   * @sign ((a, b, ..., z) -> result) -> (a -> result)
   * @see binary, uAry
   * @example
   * 
   * let arr = [1, 2, 3]
   * 
   * arr.map(parseInt) // => [1, NaN, NaN]
   * arr.map(f.unary(parseInt)) // => [1, 2, 3]
   */
  const unary = nAry(1);

  /**
   * Pass the first two parameters to supplied function and ignore others
   * 
   * @param {Function} fn
   * @return {Function}
   * @since 0.1.0
   * @category Function
   * @sign ((a, b, ..., z) -> result) -> ((a, b) -> result)
   * @see unary, uAry
   * @example
   * 
   * let printThree = (a, b, c) => [a, b, c]
   * printThree(1, 2, 3) // => [1, 2, 3]
   * 
   * let printTwo = f.binary(printThree)
   * printTwo(1, 2, 3) // => [1, 2, undefined]
   */
  const binary = nAry(2);

  /**
   * Pass the array to the function 
   * and function will called by the rest arguments of array
   * 
   * Similar to `Function.prototype.apply`, but without context
   *  
   * @param {Function} fn 
   * @param {Array} args
   * @return {*}
   * @since 0.1.0
   * @category Function, curry2
   * @sign (...x -> a) -> [x] -> a
   * @see call
   * @example 
   * 
   * let print = (...args) => args
   * let fn = f.apply(print)
   * 
   * fn([1, 2, 3]) // => [1, 2, 3]
   */
  const apply = _curry2((fn, args) => fn(...args));

  var mergeArray = apply(merge);
  var handleElementForURL = pipe(split(E_MARK), function (arr) {
      var _a;
      return (_a = {},
          _a[natvieDecode(arr[0])] = safeParse(natvieDecode(arr[1])),
          _a);
  });
  function mixer(url, params) {
      var arr = [];
      arr.push(url);
      if (!isEmpty(params)) {
          arr.push(Q_MARK);
          arr.push(encode(params));
      }
      return arr.join('');
  }
  function parser(url) {
      var str = url.split(Q_MARK)[1] || '';
      return decode(str);
  }
  function encode(params) {
      return Object.keys(params).map(function (key) { return [
          nativeEncode(key),
          E_MARK,
          nativeEncode(JSON.stringify(params[key]))
      ].join(''); }).join(A_MARK);
  }
  function decode(str) {
      if (!str)
          return {};
      var paramsArr = str.split(A_MARK).map(handleElementForURL);
      return mergeArray(paramsArr);
  }

  exports.mixer = mixer;
  exports.parser = parser;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
