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
    },
  ],
  outDir: 'dist',
  declaration: false,
};
