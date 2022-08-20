import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const commonPlugins = [
  peerDepsExternal(),
  resolve({
    extensions,
  }),
  commonjs({
    ignoreGlobal: true,
  }),
  babel({
    extensions,
    babelHelpers: 'runtime',
    include: ['src/**/*'],
  }),
]

// this should always be last
const minifierPlugin = terser({
  compress: {
    passes: 2,
  },
})

const configBase = {
  input: './src/index.ts',
  // \0 is rollup convention for generated in memory modules
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  preserveModules: true,
}

export default [
  {
    ...configBase,
    output: {
      exports: 'named',
      format: 'esm',
      dir: 'dist/esm',
      sourcemap: false,
    },
    plugins: [...commonPlugins, minifierPlugin],
  },
  {
    ...configBase,
    output: {
      exports: 'named',
      format: 'cjs',
      dir: 'dist/cjs',
      sourcemap: false,
    },
    plugins: [...commonPlugins, minifierPlugin],
  },
]
