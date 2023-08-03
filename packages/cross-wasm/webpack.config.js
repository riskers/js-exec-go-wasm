const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';
// const CopyPlugin = require("copy-webpack-plugin");
// const { fileURLToPath } = require('url');

module.exports = [
  {
    entry: './src/browser/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/browser'),
      filename: 'index.js',
      library: {
        type: 'commonjs'
      },
      // publicPath: 'https://zxx.com',
      wasmLoading: 'fetch',
      enabledWasmLoadingTypes: ['fetch'],
    },
    target: 'web',
    experiments: { 
      asyncWebAssembly: true,
      // syncWebAssembly: true
    },
    module: {
      rules: [
          // {
          //   test: /\.wasm$/,
          //   type: "asset/inline",
          // },
          {
            test: /\.wasm$/,
            type: 'javascript/auto',
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
          // {
          //   test: /\.wasm$/,
          //   type: "asset/resource",
          // },
      ],
    },
    mode: 'development',
    resolve: {
      extensions: [ '.js'],
      fallback: {
        // buffer: require.resolve("buffer"),
        // crypto: require.resolve('crypto-browserify'),
        // process: require.resolve('process/browser'),
        fs: false,
        // util: require.resolve('util/'),
        // stream: require.resolve('stream-browserify'),
        // path: require.resolve('path-browserify'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        // process: "process/browser",
      }),
      new CleanWebpackPlugin()
      // new CopyPlugin({
      //   patterns: [
      //     { from: "source", to: "dist" },
      //   ],
      // }),
    ]
  },
  {
    entry: './src/node/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/node'),
      filename: 'index.js',
      library: {
        type: 'commonjs'
      },
      // enabledWasmLoadingTypes: ['fetch'],
    },
    target: 'node',
    experiments: { 
      asyncWebAssembly: true,
      // syncWebAssembly: true
    },
    module: {
      rules: [
          // {
          //   test: /\.wasm$/,
          //   type: "asset/inline",
          // },
          {
            test: /\.wasm$/,
            type: 'javascript/auto',
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
          // {
          //   test: /\.wasm$/,
          //   type: "asset/resource",
          // },
      ],
    },
    mode: 'development',
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new CleanWebpackPlugin()
    ]
  }
];
