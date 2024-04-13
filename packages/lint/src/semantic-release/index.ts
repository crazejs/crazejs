import { createConfig, type Options as Configs } from 'semantic-release-config-gitmoji/lib/createConfig';
import { type Options } from 'semantic-release';
import rules from './rules';

export const options: Configs = {
  changelogTitle: `<a name="readme-top"></a>\n\n# Changelog`,
  releaseRules: rules,
} as Configs;

export default {
  $schema: 'https://json.schemastore.org/semantic-release',
  ...createConfig(options),
} satisfies Options;
