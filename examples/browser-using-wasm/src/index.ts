import {initialize, add, Keccak256} from "cross-wasm/browser"

;(async () => {

  await initialize({
    wasmURL: 'http://localhost:9000/node_modules/cross-wasm/dist/main.wasm'
  })

  // 223
  console.log('add res', add(1, 222))

  // 
  console.log( 'Keccak256 res:', Keccak256('hello world') )
})()
