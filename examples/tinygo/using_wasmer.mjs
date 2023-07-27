import fs from "fs";
// cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./tinygo_wasm_exec.js
import './tinygo_wasm_exec.js'

const go = new Go();
const buf = fs.readFileSync('./tinygo.wasm');
const wasm = await WebAssembly.instantiate(new Uint8Array(buf), go.importObject);
go.run(wasm.instance)

console.log( 'add res: ', wasm.instance.exports.add(1, 2) )
console.log( 'Keccak256 res:', globalThis['Keccak256']('hello world') ) // 47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad
