# Pack WASM
Universal wasm for Node and Browsers.

Can we use same wasm file both Nodejs and browser?

Here I continue to explain with [wasmer solution](../../examples/wasmer/) as the source code.

In order to pack wasm and publish it to NPM, we need to solve: How to import different files of a package on different platforms? I use package.json fields: `exports` and `typesVersions`.

## source code
* [main.wasmer](./wasm/main.wasm): cp from [tinygo-wasmer](../../examples/tinygo-wasmer/main.wasm)

## Usage Examples

* [browser](../../examples/browser-using-wasm/README.md)
* [nodejs](../../examples/nodejs-using-wasm/README.md)

## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): Give me ideas about how code structure.