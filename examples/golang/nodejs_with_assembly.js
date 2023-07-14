const fs = require('fs');

// https://nodejs.dev/en/learn/nodejs-with-webassembly/#how-to-use-it
const wasmBuffer = fs.readFileSync('./test.wasm');
WebAssembly.instantiate(wasmBuffer).then((wasmModule) => {
  console.log(wasmBuffer);
});
