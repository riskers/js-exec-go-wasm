# Cross Wasm
Universal wasm for Node and Browsers.

Can we use same wasm file both Nodejs and browser?

Here I continue to explain with [tinygo solution](../../examples/tinygo/README.md) as the source code.

In order to pack wasm and publish it to NPM, we need to solve: How to import different files of a package on different platforms?

This repo is my solution called "cross-wasm".

## WASM

```bash
> cp ../../examples/wasm/tinygo.wasm ./src/wasm/cross-wasm.wasm
```

## Usage Examples

Browsers and Nodejs can be used is same way:

```js
import {add, Keccak256} from "cross-wasm"
;(async () => {

  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
```

### Browsers

Need [Webpack Configuration](../../examples/browser-using-wasm/webpack.config.js)

> [Code](../../examples/browser-using-wasm/README.md)

### Nodejs

> [Code](../../examples/nodejs-using-wasm/README.md)

## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): inspired me how code structure.
* [wasm-pack](https://github.com/rustwasm/wasm-pack): inspired me how universal browser and Nodejs.
