const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    wasmLoading: 'fetch',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  experiments: { 
    asyncWebAssembly: true,
    // syncWebAssembly: true
  },
  resolve: {
    extensions: [ '.js'],
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
    new CleanWebpackPlugin(),
  ]
};