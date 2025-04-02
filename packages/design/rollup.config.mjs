import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import generateIndex from './generateIndex.plugin.js';


export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      }
    ],
    plugins: [
      generateIndex(),
      peerDepsExternal(),
      resolve(),
      postcss(),
      typescript({
        tsconfig: './packages/design/tsconfig.lib.json',
        declaration: true,
        declarationDir: 'dist/types',
        emitDeclarationOnly: false,
      }),
    ]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  }
];
