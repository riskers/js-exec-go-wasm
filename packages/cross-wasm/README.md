# Pack WASM
Universal wasm for Node and Browsers.

Can we use same wasm file both Nodejs and browser?

Here I continue to explain with [tinygo solution](../../examples/tinygo/README.md) as the source code.

In order to pack wasm and publish it to NPM, we need to solve: How to import different files of a package on different platforms? I use package.json fields: `exports` and `typesVersions`.

## WASM

```bash
> cp ../../examples/wasm/tinygo.wasm ./src/wasm/main.wasm
```

## Usage Examples

* [browser](../../examples/browser-using-wasm/README.md)
* [nodejs](../../examples/nodejs-using-wasm/README.md)

## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): Give me ideas about how code structure.
* [wasm-pack](https://github.com/rustwasm/wasm-pack)