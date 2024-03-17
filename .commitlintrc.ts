export default {
  $schema: 'https://json.schemastore.org/commitlintrc',
  extends: ['gitmoji'],
  ignores: [(commit: string) => /^Version Packages(.*)/.test(commit)],
  rules: {
    'footer-leading-blank': [0, 'never'],
    'header-max-length': [0, 'never'],
  },
};
