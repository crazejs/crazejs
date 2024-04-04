export default {
  $schema: 'https://json.schemastore.org/eslintrc',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    // tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'only-warn'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'error',
  },
};
