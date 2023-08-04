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

## Usage Examples

### Browsers

#### ESM

```js
import {add, Keccak256} from "cross-wasm"
;(async () => {

  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
```

Notice: Need [Webpack Copy plugin](https://github.com/riskers/js-exec-go-wasm/blob/main/cross-examples/browser-using-wasm/webpack.config.js#L45-L51)!

> [Code](../../cross-examples/browser-using-wasm/README.md)

#### UMD

```html
<script src="../node_modules/cross-wasm/dist/umd/index.js"></script>
<script>
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

## Thanks

* [@astrojs/compiler](https://github.com/withastro/compiler/tree/main): inspired me how code structure.
* [wasm-pack](https://github.com/rustwasm/wasm-pack): inspired me how universal browser and Nodejs.
