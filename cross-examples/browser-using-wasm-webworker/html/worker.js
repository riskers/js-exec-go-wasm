importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts('../node_modules/cross-wasm/dist/browser/umd/index.js')

console.log('UMD', CrossWasm);

globalThis.__PUBLIC_CROSS_WASM_PATH__ = '../node_modules/cross-wasm/dist/node/cross-wasm.wasm';

const someFunction = async (cb) => {
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
