import { add } from "cross-wasm/node";

(async () => {
  const res = await add(1, 222)
  
  // 223
  console.log(res)
})()
