// import { defineBuildConfig } from 'unbuild';

export default {
  entries: [
    {
      builder: 'mkdist',
      format: 'esm',
      ext: 'mjs',
      input: './src/',
      declaration: true,
    },
    {
      builder: 'mkdist',
      format: 'cjs',
      ext: 'cjs',
      input: './src/',
      declaration: false,
      // pattern: '**/!(*.stories).{js.jsx.ts.tsx}',
    },
  ],
  outDir: 'dist',
  declaration: false,
};
