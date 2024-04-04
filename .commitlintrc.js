module.exports = {
  // ...require('@crazejs/lint').commitlint,
  $schema: "https://json.schemastore.org/commitlintrc",
  extends: ["gitmoji"],
  rules: {
    "footer-leading-blank": [0, "never"],
    "header-max-length": [0, "never"]
  },
  ignores: [(commit) => /^Version Packages(.*)/.test(commit)],
};
