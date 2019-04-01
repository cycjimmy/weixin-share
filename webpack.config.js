var
  path = require('path')
  , webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

var
  IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
;


var config = {
  mode: process.env.NODE_ENV,
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
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: packageJson.name + ' v' + packageJson.version +
        '\nHomepage: ' + packageJson.homepage +
        '\nReleased under the ' + packageJson.license + ' License.'
    })
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  // devtool
  config.devtool = 'source-map';

  config.plugins.push(
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    })
  );
}

// production mode
if (IS_PRODUCTION) {
  config.plugins.push(
    new webpack.HashedModuleIdsPlugin(),
  );

  config.optimization = {
    minimizer: [
      // Uglify Js
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          safari10: true,
          ecma: 5,
          output: {
            comments: /^!/,
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
      }),
    ]
  };
}

module.exports = config;
