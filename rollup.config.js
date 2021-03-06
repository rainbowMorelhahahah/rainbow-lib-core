import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  typescript({
    tsconfig: 'tsconfig.json'
  }),
  resolve(),
  commonjs(),
  alias({
    entries: {
      '@': 'src'
    }
  }),
  babel({
    babelHelpers: "bundled"
  }),
]

export default [
  
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins
  },
  // "unpkg": "dist/index.esm.js",
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     file: pkg.unpkg,
  //     format: 'umd',
  //     name: 'index.umd',
  //     sourcemap: true,
  //   },
  //   external,
  //   plugins
  // }
]