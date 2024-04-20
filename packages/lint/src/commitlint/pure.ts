export default {
  $schema: 'https://json.schemastore.org/commitlintrc',
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-leading-blank': [0, 'never'],
    'header-max-length': [0, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'chore', 'wip'],
    ],
  },
  ignores: [(commit: string) => /^(.*)\[skip ci](.*)/.test(commit)],
};
