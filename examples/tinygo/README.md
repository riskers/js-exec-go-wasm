# TinyGo

[tinygo](https://tinygo.org/) can reduce the wasm size!
> TinyGo command: https://tinygo.org/docs/guides/webassembly/

## Build WASM

```bash
> tinygo build -o main.wasm -target wasm main.go
```

* [main.go](./main.go): Golang source code
* [main.wasm](./main.wasm): WASM file compiled by [tinygo](https://tinygo.org/).

> wasm file that tinygo compile size is `390k`, however Golang compile [wasm](../golang/main.wasm) is `3.9M`!

## Run on browser

![](https://i.imgur.com/xuZjWtW.png)

```bash
> npm run start
```

* [wasm_exec.html](./index.html): browser using WASM template, run!
* [tinygo_wasm_exec.js](./tinygo_wasm_exec.js): core code WASM run on Node.js and browser. `cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./tinygo_wasm_exec.js`

## Run on Node.js

```bash
> node using_wasmer.mjs
```

![](https://i.imgur.com/Vs1BDPk.png)

* [using_wasmer.mjs](./using_wasmer.mjs): Nodejs using WASM template
* [tinygo_wasm_exec.js](./tinygo_wasm_exec.js): same as above

## QA

* [syscall/js.finalizeRef not implemented](https://github.com/tinygo-org/tinygo/issues/1140#issuecomment-718145455)
