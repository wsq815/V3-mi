import path from 'path'
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/runtime-core/index.ts',
  output: [
    {
      file: './dist/vue3.esm.js',
      format: 'es'
    },
    {
      file: './dist/vue3.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    typescript()
  ]
}