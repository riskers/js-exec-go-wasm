import * as wasm from '../wasm/main.wasm';
import Go from './wasm_exec.js';

export const initialize = async (options) => {
  let wasmURL = options.wasmURL;
  // if (!wasmURL) throw new Error('Must provide the "wasmURL" option');
  if (!initializePromise) {
    // const input = wasmURL || new URL('main.wasm', import.meta.url)
    const input = wasmURL || wasm.default
    // input = new URL('main.wasm', import.meta.url);
    // const input = wasmURL || './main.wasm'
    // console.log('import.meta.url', import.meta.url, new URL('main.wasm', import.meta.url));
    console.log('input', input)
    initializePromise = startRunningService(input).catch((err) => {
      // Let the caller try again if this fails.
      initializePromise = void 0;
      // But still, throw the error back up the caller.
      throw err;
    });
  }
  longLivedService = longLivedService || (await initializePromise);
};

const instantiateWASM = async (wasmURL) => {
  let module = undefined;
  const go = new Go();

  if (!WebAssembly.instantiateStreaming) {
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
			const source = await (await resp).arrayBuffer();
			return await WebAssembly.instantiate(source, importObject);
		};
  }

  const fetchAndInstantiateTask = async () => {
    return WebAssembly.instantiateStreaming(fetch(wasmURL), go.importObject);
  };
  module = await fetchAndInstantiateTask();
  go.run(module.instance);

  return module;
};

let initializePromise
let longLivedService

export const ensureServiceIsRunning = () => {
  if (!initializePromise) throw new Error('You need to call "initialize" before calling this');
  if (!longLivedService) throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
  return longLivedService;
};

const startRunningService = async (wasmURL) => {
  console.log('start...')
  const module = await instantiateWASM(wasmURL);
  const exports = module.instance.exports;

  const { add } = exports;
  const { Keccak256 } = globalThis

  return {
    add,
    Keccak256
  }
};