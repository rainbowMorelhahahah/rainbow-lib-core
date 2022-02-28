import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
    typescript({
        tsconfig: 'tsconfig.json'
    }),
    resolve(),
    commonjs()
]

export default {
    input: 'src/index.ts',
    output: {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
    },
    external,
    plugins
    
}