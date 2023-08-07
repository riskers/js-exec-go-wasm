import path from 'path';
import * as wasm from '../wasm/cross-wasm.wasm';
import { getService,instantiateWASM } from './init';

// 1. modify method of `exports` and `globalThis` export.
export const startRunningService = async () => {
  // `wasm.default` is `cross-wasm.wasm`
  const wasmPath = path.resolve(__dirname, wasm.default);
  const module = await instantiateWASM(wasmPath);
  const exports = module.instance.exports;

  // `exports` is a map to `//export` way of TinyGo way.
  const { add } = exports;

  // `globalThis` is a map to complex way of `syscall/js` way.
  const { Keccak256 } = globalThis;
  
  return {
    add,
    Keccak256
  };
};

// 2. wasm export function:
export const add = async (a, b) => {
  const service = await getService()
  return service.add(a, b)
}

export const Keccak256 = async (data) => {
  const service = await getService()
  return service.Keccak256(data)
}
