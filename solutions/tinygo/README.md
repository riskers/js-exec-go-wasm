# TinyGo

[tinygo](https://tinygo.org/) can reduce the wasm size!
> TinyGo command: https://tinygo.org/docs/guides/webassembly/

## WASM

```bash
> cp ../../wasm/tinygo.wasm .
```

> [tinygo.wasm](./tinygo.wasm): WASM file compiled by tinygo.

## Run on browser

![](https://i.imgur.com/xuZjWtW.png)

```bash
> npm run start
```

* [index.html](./index.html): browser using WASM template, run!
* [tinygo_wasm_exec.js](./tinygo_wasm_exec.js): core code WASM run on Node.js and browser. `cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./tinygo_wasm_exec.js`

## Run on Node.js

```bash
> node index.mjs
```

![](https://i.imgur.com/Vs1BDPk.png)

* [index.mjs](./index.mjs): Nodejs using WASM template
* [tinygo_wasm_exec.js](./tinygo_wasm_exec.js): same as above

## QA

* [syscall/js.finalizeRef not implemented](https://github.com/tinygo-org/tinygo/issues/1140#issuecomment-718145455)
