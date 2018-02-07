var
  path = require('path')

  // webpack plugin
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

var
  IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
;


var config = {
  entry: path.resolve('src', 'index.js'),

  output: {
    path: path.resolve('build'),
    filename: IS_PRODUCTION
      ? 'WxShare.min.js'
      : 'WxShare.js',
    library: 'WxShare',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        include: [
          path.resolve('src')
        ],
        exclude: [
          path.resolve('node_modules')
        ],
        loader: 'babel-loader'
      },
    ]
  },

  plugins: [],
};

// dev mode
if (IS_DEVELOPMENT) {
  // devtool
  config.devtool = 'source-map';

  config.plugins.push(
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),
  );
}

// production mode
if (IS_PRODUCTION) {
  config.plugins.push(
    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        },
        warnings: false,
        sourceMap: true
      }
    })
  );
}

module.exports = config;
