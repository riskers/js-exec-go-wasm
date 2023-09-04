import fs from "fs";

import Go from './go_wasm_exec_node.js'

const go = new Go();
const buf = fs.readFileSync('./go.wasm');
const wasm = await WebAssembly.instantiate(new Uint8Array(buf), go.importObject);
go.run(wasm.instance)

console.log( 'Keccak256 res:', globalThis['Keccak256']('hello world') ) // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
