import {ensureServiceIsRunning, initialize, instantiateWASM} from './init';

export const getWasmPath = () => window.__PUBLIC_CROSS_WASM_PATH__;

// 1. modify method of `exports` and `globalThis` export.
export const startRunningService = async () => {
  const WASM_PATH = getWasmPath();
  const module = await instantiateWASM(WASM_PATH);
  const exports = module.instance.exports;

  // `exports` is a map to `//export` way of TinyGo way.
  const { add } = exports;

  // `globalThis` is a map to complex way of `syscall/js` way.
  const { Keccak256 } = globalThis

  return {
    add,
    Keccak256
  }
};

// 2. wasm export function:
export const add = async (a, b) => {
  await initialize()
  return ensureServiceIsRunning().add(a, b)
}

export const Keccak256 = async (data) => {
  await initialize()
  return ensureServiceIsRunning().Keccak256(data)
}
