import {init, add, Keccak256} from "cross-wasm"
// import 'cross-wasm/cross-wasm.wasm'

/**
 * open comment: automatically import wasm
 */
;(async () => {
  // await init();
  await init('../node_modules/cross-wasm/dist/cross-wasm.wasm')

  // 223
  console.log('add res', add(1, 222))

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  console.log( 'Keccak256 res:', Keccak256('hello world') )
})();
