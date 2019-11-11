import {input, name, plugins,} from './rollup.common';

import pkg from '../package.json';

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser.replace('.min.js', '.js'),
      format: 'umd',
    },
    plugins: [
      ...plugins,
    ],
  },
];
