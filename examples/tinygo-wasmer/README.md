# TinyGo + Wasmer

[wasmer](https://github.com/wasmerio/wasmer) is a WebAssembly Runtime.

> It doesn't seem to work with `syscall/js` compiled wasm files, I used [tinygo](https://tinygo.org/) instead.

## WASM

* [main.go](./main.go): Golang code (Notice: did not use `syscall/js`)
* [main.wasm](./main.wasm): WASM file compiled by [tinygo](https://tinygo.org/). Bulid command: `tinygo build -o main.wasm -target wasi main.go`
  > TinyGo command: https://tinygo.org/docs/guides/webassembly/wasi/
  > wasm file that tinygo compile size is `13kb`, however Golang compile [wasm](../golang/main.wasm) is `1.4mb`

## Usage on browser

* [wasm_exec.html](./wasm_exec.html): browser using WASM template, run!
  ![](https://i.imgur.com/io5tJVO.png)
* [wasm_exec.js](./wasm_exec.js): core code WASM run on Node.js and browser. `cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .`
  > `go.importObject` must be supplyed as argument of  `WebAssembly.instantiate`, because wasm is compiled by TinyGo.

## Usage on Node.js

* [using_wasmer.mjs](./using_wasmer.mjs): 
  ![](https://i.imgur.com/EKcm1wu.png)
