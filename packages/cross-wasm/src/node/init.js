import fs from "node:fs";
import path from "node:path";
import * as wasm from '../wasm/cross-wasm.wasm';
import Go from './wasm_exec';
let longLivedService;

export const getService = () => {
  if (!longLivedService) {
    longLivedService = startRunningService().catch((err) => {
      // Let the caller try again if this fails.
      longLivedService = void 0;
      // But still, throw the error back up the caller.
      throw err;
    });
  }
  return longLivedService;
};

const instantiateWASM = async (wasmPath) => {
  let response = undefined;

  const fetchAndInstantiateTask = async () => {
    const buf = fs.readFileSync(wasmPath);
    const go = new Go();
    const module = await WebAssembly.instantiate(new Uint8Array(buf), go.importObject);

    go.run(module.instance);
    return module;
  };
  response = await fetchAndInstantiateTask();

  return response;
};

const startRunningService = async () => {
  // `wasm.default` is `main.wasm`
  const wasmPath = path.resolve(__dirname, wasm.default);
  const module = await instantiateWASM(wasmPath);
  const exports = module.instance.exports;

  const { add } = exports;
  const { Keccak256 } = globalThis;
  
  return {
    add,
    Keccak256
  };
};
