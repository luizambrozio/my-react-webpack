const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
  root: path.join(__dirname, '/'),
}

const getEntry = (env) => {
  const app = [
    PATHS.src + '/index.jsx',
  ]

  const dev = [];

  const polyfill = [
    'babel-polyfill',
  ]

  return env.prod ? polyfill.concat(app) : polyfill.concat(dev.concat(app));
}

const getPlugins = (env) => {
  const commonPlugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('manifest'),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      filename: 'index.html',
      inject: 'body',
      title: 'My React App',
      chunksSortMode: 'dependency',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ];

  const productionPlugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
      comments: false
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new CleanWebpackPlugin(['dist'], { root: PATHS.root }),
    new InlineManifestWebpackPlugin({ name: 'webpackManifest' }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
      },
    }),
  ];

  const developmentPlugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
      },
    }),
  ];

  const extraPlugins = env.prod ? productionPlugins : developmentPlugins;

  return commonPlugins.concat(extraPlugins);
}

const getRules = (env) => {
  const commonRules = [
    {
      test: /\.jsx?$/,
      include: PATHS.src,
      use: [
        'babel-loader',
      ],
    },
    {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: env.prod ? '[hash:8].[ext]' : 'images/[name].[ext]?[hash:8]',
        },
      }],
    },
    {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: env.prod ? '[hash:8].[ext]' : 'images/[name].[ext]?[hash:8]',
        }
      }],
    }
  ];

  const productionRules = [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
        ]
      })
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      }),
    },
  ];

  const developmentRules = [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
      ],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoader=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
        'sass-loader',
      ],
    },
  ];

  const extraRules = env.prod ? productionRules : developmentRules;

  return commonRules.concat(extraRules);
};

const getDevServer = (env) => {
  const devServer = {
    publicPath: '/',
    clientLogLevel: 'info',
    compress: true,
    contentBase: PATHS.dist,
    historyApiFallback: true,
    inline: true,
    hot: false,
  }

  return env.prod ? {} : devServer;
}

const config = env => (
  {
    devtool: env.prod ? 'source-map' : 'inline-source-map',

    context: PATHS.src,

    entry: { app: getEntry(env) },

    output: {
      path: PATHS.dist,
      filename: env.prod ? 'js/[name].[hash:8].js' : 'js/[name].js',
      publicPath: '/',
    },

    module: {
      rules: getRules(env)
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    plugins: getPlugins(env),

    devServer: getDevServer(env),
  }
);

module.exports = config;
