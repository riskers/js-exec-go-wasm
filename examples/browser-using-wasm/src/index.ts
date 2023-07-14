import {initialize, add} from "cross-wasm/browser"

;(async () => {

  await initialize({
    wasmURL: 'http://localhost:9000/node_modules/cross-wasm/dist/main.wasm'
  })

  // 223
  const res = add(1, 222)
  console.log(res)
})()
