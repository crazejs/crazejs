export default {
  $schema: 'https://json.schemastore.org/commitlintrc',
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-leading-blank': [0, 'never'],
    'header-max-length': [0, 'never'],
  },
  ignores: [(commit: string) => /^(.*)\[skip ci](.*)/.test(commit)],
};
