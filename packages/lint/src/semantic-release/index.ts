import { createConfig } from 'semantic-release-config-gitmoji/lib/createConfig';
import options from './options';

export default {
  $schema: 'https://json.schemastore.org/semantic-release',
  ...createConfig(options),
};
