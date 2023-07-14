const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: "development",
  // target: 'webworker',
  
  // must provide because wasmer
  externals: {
    'wasmer_wasi_js_bg.wasm': true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js'],
    fallback: {
      buffer: require.resolve("buffer"),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser'),
      fs: false,
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      // process: "process/browser",
    }),
  ]
};