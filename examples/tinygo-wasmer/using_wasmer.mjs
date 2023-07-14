import fs from "fs";
import { init, WASI } from "@wasmer/wasi";

// This is needed to load the WASI library first
await init();

let wasi = new WASI({
  env: {},
  args: [],
});

const buf = fs.readFileSync('./test.wasm');

const module = await WebAssembly.compile(
  new Uint8Array(buf)
);
const instant = await wasi.instantiate(module, {});

let exitCode = wasi.start();
let stdout = wasi.getStdoutString();

// https://i.imgur.com/EKcm1wu.png
console.log( instant.exports )

// 223
console.log( instant.exports.add(1, 222) )
