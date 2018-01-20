/* eslint-disable */
import webpack from 'webpack';
import path from 'path';
import WorkboxBuildWebpackPlugin from 'workbox-webpack-plugin';

const BUILD_DIR = path.resolve(__dirname, 'bin');
const SRC_DIR = path.resolve(__dirname, 'src');
const NODE_DIR = path.resolve(__dirname, 'node_modules');

const generateBabelEnvLoader = (browserlist) => {
  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: browserlist,
            },
          },
        ],
        'react',
      ],
      plugins: [
        'transform-imports',
        'syntax-dynamic-import',
        'transform-object-rest-spread',
        'transform-es2015-destructuring'],
    },
  };
};

const config = {
  entry: 'app',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: generateBabelEnvLoader([
          // The last two versions of each browser, excluding versions
          // that don't support <script type="module">.
          'last 2 Chrome versions', 'not Chrome < 60',
          'last 2 Safari versions', 'not Safari < 10.1',
          'last 2 iOS versions', 'not iOS < 10.3',
          'last 2 Firefox versions', 'not Firefox < 54',
          'last 2 Edge versions', 'not Edge < 15',
        ]),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              useRelativePath: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [SRC_DIR, NODE_DIR],
  }, 
}; 