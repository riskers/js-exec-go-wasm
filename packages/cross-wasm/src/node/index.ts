import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Service } from "../shared/types";
import Go from './wasm_exec';

let longLivedService: Promise<Service> | undefined;

export const add = async (a: number, b: number) => {
  const service = await getService()
  return service.add(a, b)
}

export const Keccak256 = async (data: string) => {
  const service = await getService()
  return service.Keccak256(data)
}

const getService = (): Promise<Service> => {
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

const instantiateWASM = async (wasmPath: string) => {
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

const startRunningService = async (): Promise<Service> => {
  const wasmPath = fileURLToPath(new URL('../main.wasm', import.meta.url));
  const wasm = await instantiateWASM(wasmPath);

  const exports: any = wasm.instance.exports;

  const { add } = exports
  const { Keccak256 } = (globalThis as any);
  
  return {
    add,
    Keccak256
  };
};