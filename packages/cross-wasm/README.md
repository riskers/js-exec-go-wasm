# Cross Wasm
Universal wasm for Node and Browsers.

Can we use same wasm file both Nodejs and browser?

Here I continue to explain with [tinygo solution](../../solutions/tinygo/README.md) as the source code.

In order to pack wasm and publish it to NPM, we need to solve: How to import different files of a package on different platforms?

This repo is my solution called [cross-wasm](https://github.com/riskers/js-exec-go-wasm/blob/main/packages/cross-wasm/README.md)

As template, we need to modify these files:
* [wasm](./src/wasm/cross-wasm.wasm): Your wasm file
* [expose types](./types/expose.d.ts): Depends on your wasm function name and type parameters
* [browser/index.js](./src/browser/index.js):
  * the method of `exports` and `globalThis` export in `startRunningService` function.
  * wasm function such as `add` or `Keccak256`
* [node/index.js](./src/node/index.js):
  * the method of `exports` and `globalThis` export in `startRunningService` function.
  * wasm function such as `add` or `Keccak256`
* [package.json](./package.json): `"./cross-wasm.wasm"` field in `exports`

## WASM

```bash
> cp ../../wasm/tinygo.wasm ./src/wasm/cross-wasm.wasm
```

## Build NPM

```bash
> npm run build
```

## Usage Examples

### Browsers

#### ESM

```js
import {add, Keccak256} from "cross-wasm"

// set wasm path
(window as any).__PUBLIC_CROSS_WASM_PATH__ = '../node_modules/cross-wasm/dist/node/cross-wasm.wasm';

;(async () => {

  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
```

> [Code](../../cross-examples/browser-using-wasm/README.md)

#### UMD

```html
<script src="../node_modules/cross-wasm/dist/umd/index.js"></script>
<script>
  // set wasm path
  window.__PUBLIC_CROSS_WASM_PATH__ = '../node_modules/cross-wasm/dist/node/cross-wasm.wasm';

  ;(async () => {
    // 223
    console.log('add res', await CrossWasm.add(1, 222))

    // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
    console.log( 'Keccak256 res:', await CrossWasm.Keccak256('hello world') )
  })()
</script>
```

> [Code](../../cross-examples/browser-using-wasm/html/umd.html)

### Nodejs

```js
const { add, Keccak256 } = require("cross-wasm");

;(async () => {
  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
```

> [Code](../../cross-examples/nodejs-using-wasm/README.md)

### Universal JavaScript

You can see, `cross-wasm` supply both Nodejs and Browser functionality but two entry points usage are different.

How to use cross-wasm both on Nodejs and Browser regardless of the environment?

You can reference this code:

```js
export class crossWasmInit {  
  // 1. init wasm 
  // if using on Nodejs , not set wasmURL
  // if using on browser, set wasmURL
  constructor(wasmURL?: string) {
    if (wasmURL) {
      globalThis.__PUBLIC_CROSS_WASM_PATH__ = wasmURL;
    }
  }

  // 2. function name map to wasm function
  function async add(a, b) {
    return await add(a, b);
  }

  function async Keccak256(data) {
    return await Keccak256(data);
  }
}

// 3. usage
const wasm = new crossWasmInit("wasm CDN URL");
;(async () => {
  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
```

> NOTICE: This method is not usually used because you need to decide whether to use Nodejs or Browser. Unless you want to develop a cross library.


## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): inspired me how code structure.
* [wasm-pack](https://github.com/rustwasm/wasm-pack): inspired me how universal browser and Nodejs.
