import rules from './rules';

export default {
  $schema: 'https://json.schemastore.org/semantic-release',
  // https://semantic-release.gitbook.io/semantic-release/usage/plugins#plugins-installation
  plugins: [
    // 负责解析 commit
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: rules,
      },
    ],
    // 生成 github-release 的日志
    '@semantic-release/release-notes-generator',
    // 调用上一个插件生成的新增日志，然后合并到原有日志中
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '<a name="readme-top"></a>\n\n# Changelog',
      },
    ],
    // 自动更新版本号，如果没有 private，会作为 npm 模块进行发布
    '@semantic-release/npm',
    // 将生成结果发布到 Github
    '@semantic-release/github',
    // 推送代码到 Git
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: 'chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}',
      },
    ],
  ],
  branches: [
    'master',
    'main',
    {
      name: 'rc-*',
      prerelease: 'rc',
      channel: 'rc',
    },
    {
      name: 'rc',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: 'alpha',
      channel: 'alpha',
    },
    {
      name: 'beta',
      prerelease: 'beta',
      channel: 'beta',
    },
  ],
};
