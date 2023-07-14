import { init } from '@wasmer/wasi';
import type { InitializeOptions, Service, initializeFn } from '../shared/types.js';
import { Go } from './wasm_exec';

export const add = (a: number, b: number) => {
  return ensureServiceIsRunning().add(a, b)
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

const instantiateWASM = async (wasmURL: string, importObject: Record<string, any>): Promise<WebAssembly.WebAssemblyInstantiatedSource> => {
  let response = undefined;

  if (WebAssembly.instantiateStreaming) {
    response = await WebAssembly.instantiateStreaming(fetch(wasmURL), importObject);
  } else {
    const fetchAndInstantiateTask = async () => {
      // const wasmArrayBuffer = await fetch(wasmURL).then((res) => res.arrayBuffer());
      return WebAssembly.instantiateStreaming(fetch(wasmURL), importObject);
    };
    response = await fetchAndInstantiateTask();
  }

  return response;
};

let initializePromise: Promise<Service> | undefined;
let longLivedService: Service | undefined;

const ensureServiceIsRunning = (): Service => {
  if (!initializePromise) throw new Error('You need to call "initialize" before calling this');
  if (!longLivedService) throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
  return longLivedService;
};

const startRunningService = async (wasmURL: string): Promise<Service> => {
  await init();
  const go = new Go();
  const module = await instantiateWASM(wasmURL, go.importObject);
  
  const exports: any = module.instance.exports;

  const { add } = exports;

  return {
    add
  }
};