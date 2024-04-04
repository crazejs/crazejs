module.exports = {
  ...require('@crazejs/lint').commitlint,
  ignores: [(commit) => /^Version Packages(.*)/.test(commit)],
};
