import type { InitializeOptions, Service, initializeFn } from '../shared/types.js';
import Go from './wasm_exec';

export const add = (a: number, b: number) => {
  return ensureServiceIsRunning().add(a, b)
}

export const Keccak256 = (data: string) => {
  return ensureServiceIsRunning().Keccak256(data)
}

export const initialize: typeof initializeFn = async (options: InitializeOptions) => {
  let wasmURL = options.wasmURL;
  if (!wasmURL) throw new Error('Must provide the "wasmURL" option');
  if (!initializePromise) {
    initializePromise = startRunningService(wasmURL).catch((err) => {
      // Let the caller try again if this fails.
      initializePromise = void 0;
      // But still, throw the error back up the caller.
      throw err;
    });
  }
  longLivedService = longLivedService || (await initializePromise);
};

const instantiateWASM = async (wasmURL: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> => {
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

let initializePromise: Promise<Service> | undefined;
let longLivedService: Service | undefined;

const ensureServiceIsRunning = (): Service => {
  if (!initializePromise) throw new Error('You need to call "initialize" before calling this');
  if (!longLivedService) throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
  return longLivedService;
};

const startRunningService = async (wasmURL: string): Promise<Service> => {
  const module = await instantiateWASM(wasmURL);
  const exports: any = module.instance.exports;

  const { add } = exports;
  const { Keccak256 } = (globalThis as any)

  return {
    add,
    Keccak256
  }
};