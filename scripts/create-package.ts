import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'node:path';

const org = 'crazejs';
const dir = 'packages';

interface Options {
  name: string;
  version: string;
  description: string;
  eslint: boolean;
  typescript: boolean;
  build: boolean;
}

/**
 * create package config
 * @param name
 * @param version
 * @param description
 * @param eslint
 * @param typescript
 * @param build
 */
const createPkgConfig = ({ name, version, description, eslint, typescript, build }: Options) => {
  return {
    name: `@${org}/${name}`,
    version: version,
    description: description,
    ...(build && {
      main: './dist/index.cjs',
      ...(typescript && {
        types: './dist/index.d.ts',
      }),
      exports: {
        '.': {
          import: './dist/index.mjs',
          require: './dist/index.cjs',
        },
      },
      files: ['dist'],
    }),
    scripts: {
      dev: build ? 'nodemon --exec "pnpm run build" --watch ./src' : '',
      build: build ? 'unbuild' : '',
      lint: eslint ? 'eslint "{src,tests}/**/*.{js,jsx,ts,tsx}" --fix' : '',
    },
    keywords: [],
    author: 'Anguer',
    license: 'MIT',
    repository: {
      type: 'git',
      url: `git+https://github.com/${org}/${org}.git`,
      directory: `packages/${name}`,
    },
    bugs: {
      url: `https://github.com/${org}/${org}/issues`,
    },
    homepage: `https://github.com/${org}/${org}/tree/master/packages/${name}#readme`,
    publishConfig: {
      access: 'public',
    },
    devDependencies: {
      ...(eslint && { '@crazejs/lint': 'workspace:^' }),
      ...(typescript && { '@crazejs/tsconfig': 'workspace:^' }),
      ...(eslint && { eslint: '^8' }),
      ...(typescript && { typescript: '^5' }),
    },
  };
};

(async () => {
  const { name: n, ...response } = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Please enter the package name:',
      validate: (value: string) => value.replace(/\s/g, '').length > 0,
    },
    {
      type: 'text',
      name: 'description',
      message: 'Please enter the package description (optional):',
      initial: '',
    },
    {
      type: 'text',
      name: 'version',
      message: 'Please enter the package version (in format x.y.z):',
      initial: '0.0.0',
      validate: (value: string) => /^\d+\.\d+\.\d+$/.test(value),
    },
    {
      type: 'confirm',
      name: 'eslint',
      message: 'Would you like to use ESLint?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use Typescript?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'build',
      message: 'Confirm if you need to build with unbuild:',
      initial: true,
    },
  ]);

  const name = n.replace(/\s/g, '');

  // init directory
  const output = path.join(process.cwd(), dir, name);
  console.log('[create-package#output]', output);
  fs.ensureDirSync(output);
  fs.ensureDirSync(path.resolve(output, 'src'));
  fs.ensureFileSync(path.resolve(output, 'src', 'index.ts'));

  // write package.json
  const pkgConfig = createPkgConfig({ name, ...response });
  console.log('[create-package#pkgConfig]', pkgConfig);
  const pkgFile = path.resolve(output, 'package.json');
  fs.outputJSONSync(pkgFile, pkgConfig, { spaces: 2 });

  // write .eslintrc
  if (response.eslint) {
    const eslintConfig = {
      root: true,
      extends: ['@crazejs/eslint-config/baserc'],
    };
    const eslintrcFile = path.resolve(output, '.eslintrc');
    fs.outputJSONSync(eslintrcFile, eslintConfig, { spaces: 2 });
  }

  // write tsconfig.json
  if (response.typescript) {
    const tsconfig = {
      extends: '@crazejs/tsconfig/base.json',
      compilerOptions: {
        target: 'es2016',
        module: 'ESNext',
        forceConsistentCasingInFileNames: true,
      },
      include: ['src'],
    };
    const tsconfigFile = path.resolve(output, 'tsconfig.json');
    fs.outputJSONSync(tsconfigFile, tsconfig, { spaces: 2 });
  }

  // write README.md
  const readme = [
    '<h1 align="center">',
    pkgConfig.name,
    '<div>',
    '',
    `[![npm](https://img.shields.io/npm/v/${pkgConfig.name}.svg)](https://npmjs.com/package/${pkgConfig.name})`,
    '',
    '</div>',
    '</h1>',
  ].join('\n');
  const readmeFile = path.resolve(output, 'README.md');
  fs.outputFileSync(readmeFile, readme);
})();
