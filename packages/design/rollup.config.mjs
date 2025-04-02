import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import mdx from '@mdx-js/rollup';
import svg from '@svgr/rollup';
import url from '@rollup/plugin-url';
import generateIndex from './generateIndex.plugin.js';
import json from '@rollup/plugin-json';

export default {
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    generateIndex(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    json(),
    mdx(),
    svg({
      svgo: false,
      titleProp: true,
      ref: true,
    }),
    url({
      limit: 10000,
    }),
  ],
};
