import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  }),
  terser({
    include: [/^.+\.min\.js$/], 
  }),
  json(),
  resolve(),
]

export default {
  input: 'src/index.ts',
  plugins,
  output: [
    {
      file: 'dist/jsonify-url-payload.esm.js',
      format: 'esm'
    }, 
    {
      file: 'dist/jsonify-url-payload.esm.min.js',
      format: 'esm'
    }, 
    {
      file: 'dist/jsonify-url-payload.cjs.js',
      format: 'cjs'
    }, 
    {
      file: 'dist/jsonify-url-payload.cjs.min.js',
      format: 'cjs'
    }, 
    {
      name: 'jsonifyURL',
      file: 'dist/jsonify-url-payload.umd.js',
      format: 'umd'
    }, 
    {
      name: 'jsonifyURL',
      file: 'dist/jsonify-url-payload.umd.min.js',
      format: 'umd'
    }
  ]
}
