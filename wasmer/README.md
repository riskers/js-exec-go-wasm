# TinyGo + Wasmer

[wasmer](https://github.com/wasmerio/wasmer) is a WebAssembly Runtime.

> It doesn't seem to work with `syscall/js` compiled wasm files, I used [tinygo](https://tinygo.org/) instead.

## WASM source code

* [main.go](./main.go): Golang code (Notice: did not use `syscall/js`)

## TinyGo
* [test.wasm](./test.wasm): WASM file compiled by [tinygo](https://tinygo.org/). Bulid command: `tinygo build -o test.wasm -target wasi main.go`

## Usage on browser

* [wasm_exec.html](./wasm_exec.html): browser using WASM template, run!
  ![](https://i.imgur.com/yH3jM2E.png)
* [wasm_exec.js](./wasm_exec.js): core code WASM run on Node.js and browser. `cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .`
  > `go.importObject` must be supplyed as argument of  `WebAssembly.instantiate`, because wasm is compiled by TinyGo.

## Usage on Node.js

* [using_wasmer.mjs](./using_wasmer.mjs): 
  ![](https://i.imgur.com/yVsJs2F.png)
