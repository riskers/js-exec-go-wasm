# Cross Wasm

Universal wasm for Node and Browsers.

Can we use the same WASM file for both Nodejs and browsers?

Here I continue to explain with [tinygo solution](../../solutions/tinygo/README.md) as the source code.

To pack wasm and publish it to NPM, we need to solve: How to import different files of a package on different platforms?

This repo is my solution called [cross-wasm](https://github.com/riskers/js-exec-go-wasm/blob/main/packages/cross-wasm/README.md)

As a template, we need to modify these files:

* [wasm](./src/wasm/cross-wasm.wasm): Your wasm file
* [expose types](./types/expose.d.ts): Depends on your wasm function name and type parameters
* [browser/index.js](./src/browser/index.js):
  * the method of `exports` and `globalThis` export in the `startRunningService` function.
  * wasm function such as `add` or `Keccak256`
* [node/index.js](./src/node/index.js):
  * the method of `exports` and `globalThis` export in the `startRunningService` function.
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

```html
<script type="module">
  import {init, add} from '../node_modules/cross-wasm/dist/index.esm.js';

  const run = async () => {
    await init();
    const result = add(1, 2);
    console.log(`result is: ${result}`);
  }

  run();
</script>
```

> [Code](../../cross-examples/browser-using-wasm/html/esm.html)

#### UMD

```html
<script src="../node_modules/cross-wasm/dist/index.aio.js"></script>
<script>
  // WASM exports as `CrowssWasm` UMD module.
  console.log('UMD', CrossWasm);

  ;(async () => {
    await CrossWasm.init()

    // 223
    console.log('add res', CrossWasm.add(1, 222))
    // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
    console.log( 'Keccak256 res:', CrossWasm.Keccak256('hello world') )
  })()
</script>
```

> [Code](../../cross-examples/browser-using-wasm/html/umd.html)

#### WebWorker

```js
importScripts('../node_modules/cross-wasm/dist/index.worker.aio.js')
(async () => {
  await CrossWasm.init('../node_modules/cross-wasm/dist/cross-wasm.wasm')
  // 223
  const addRes = await CrossWasm.add(1, 222)
  // ...
})()
```

#### Webpack

##### Set wasm path manually

```js
import {init, add, Keccak256} from "cross-wasm"

;(async () => {
  await init('../node_modules/cross-wasm/dist/cross-wasm.wasm')
  // ...
})()
```

##### Automatically wasm path

```js
import {init, add, Keccak256} from "cross-wasm"
import 'cross-wasm/cross-wasm.wasm'

;(async () => {
  await init();
  // ...
})()
```

Webpack config add:

```json
{
  test: /\.wasm$/,
  type: "asset/resource",
  generator: {
    filename: '[name][ext]',
  }
}
```

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

The `cross-wasm` supplies both Nodejs and Browser functionality, but the usage of the two entry points is different.

How to use cross-wasm both on Nodejs and Browser regardless of the environment?

You can reference this code:

```js
export class crossWasmInit {  
  // 1. init wasm 
  // If using on Nodejs, not set wasmURL
  // If using on browser, set wasmURL
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

> NOTICE: This method is not usually used because you must decide whether to use Nodejs or Browser. Unless you want to develop a cross-library.

## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): inspired me how code structure.
* [wasm-pack](https://github.com/rustwasm/wasm-pack): inspired me how universal browser and Nodejs.
