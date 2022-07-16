const fs = require('fs');

const wasmBuffer = fs.readFileSync('./test.wasm');
WebAssembly.instantiate(wasmBuffer).then((wasmModule) => {
  console.log(wasmBuffer);
});
