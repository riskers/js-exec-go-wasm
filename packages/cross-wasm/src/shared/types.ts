export interface InitializeOptions {
  // The URL of the wasm file. This must be provided when running
  // astro in the browser.
  wasmURL?: string;
}

export declare function initializeFn(options: InitializeOptions): Promise<void>;

export interface Service {
  add: (a: number, b: number) => number;
  Keccak256: (data: string) => string;
}