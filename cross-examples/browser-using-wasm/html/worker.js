importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts('../node_modules/cross-wasm/dist/index.worker.aio.js')

console.log('UMD', CrossWasm);

const someFunction = async (cb) => {
  await CrossWasm.init('../node_modules/cross-wasm/dist/cross-wasm.wasm')
  // 223
  const addRes = await CrossWasm.add(1, 222)

  // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
  const Keccak256Res = await CrossWasm.Keccak256('hello world')

  await cb({
    addRes,
    Keccak256Res
  })
}

Comlink.expose(someFunction)
