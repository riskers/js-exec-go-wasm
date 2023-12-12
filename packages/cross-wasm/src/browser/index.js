import {ensureServiceIsRunning, initialize, instantiateWASM} from './init';

// 1. wasm export function:
export const add = (a, b) => {
  return ensureServiceIsRunning().add(a, b)
}

export const Keccak256 = (data) => {
  return ensureServiceIsRunning().Keccak256(data)
}

// 2. modify method of `exports` and `globalThis` export.
export const startRunningService = async (input) => {
  console.log('import.meta.url', import.meta.url)
  if (input === undefined) {
    input = new URL('../wasm/cross-wasm.wasm', import.meta.url)
  }

  const module = await instantiateWASM(input);
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

export const init = initialize;