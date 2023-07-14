import { init, WASI } from "@wasmer/wasi";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Service } from "../shared/types";

let longLivedService: Promise<Service> | undefined;

export const add = async (a: number, b: number) => {
  const service = await getService()

  return service.add(a, b)
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

const instantiateWASM = async (wasmPath: string): Promise<WebAssembly.Module> => {
  let response = undefined;

  const fetchAndInstantiateTask = async () => {
    const buf = fs.readFileSync(wasmPath);
    const module = await WebAssembly.compile(
      new Uint8Array(buf)
    );

    return module;
  };
  response = await fetchAndInstantiateTask();

  return response;
};

const startRunningService = async (): Promise<Service> => {
  await init();

  let wasi = new WASI({
    env: {},
    args: [],
  });

  const wasmPath = fileURLToPath(new URL('../main.wasm', import.meta.url));

  const module = await instantiateWASM(wasmPath);
  const instant = wasi.instantiate(module, {});

  wasi.start();
  wasi.getStdoutString();

  // console.log(`${stdout}(exit code: ${exitCode})`);

  const exports: any = instant.exports

  const { add } = exports
  
  return {
    add
  };
};