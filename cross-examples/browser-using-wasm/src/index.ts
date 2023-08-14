import {add, Keccak256} from "cross-wasm"

(window as any).__PUBLIC_CROSS_WASM_PATH__ = '../node_modules/cross-wasm/dist/node/cross-wasm.wasm';

console.log('ESM')

;(async () => {

  // 223
  console.log('add res', await add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', await Keccak256('hello world') )
})()
