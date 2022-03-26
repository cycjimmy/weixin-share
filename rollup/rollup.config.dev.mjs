/* eslint import/extensions: ["error", "ignorePackages", {"mjs": off}] */
import { input, name, plugins } from './rollup.common.mjs';

import pkg from '../package.cjs';

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser.replace('.min.js', '.js'),
      format: 'umd',
      exports: 'default',
    },
    plugins: [
      ...plugins,
    ],
  },
];
