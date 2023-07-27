# Golang

[tinygo](https://tinygo.org/) can reduce the wasm size!
> TinyGo command: https://tinygo.org/docs/guides/webassembly/

## WASM

```bash
> cp ../wasm/go.wasm .
```

> [go.wasm](./go.wasm): WASM file compiled by go.

## Run on browser

![](https://i.imgur.com/wKYZH28.png)

```bash
> npm run start
```

* [index.html](./index.html): browser using WASM template, run!
* [go_wasm_exec.js](./go_wasm_exec.js): core code WASM run browser.

## Run on Node.js

```bash
> node using_wasmer.mjs
```

![](https://i.imgur.com/mLm3Z5I.png)

* [index.mjs](./index.mjs): Nodejs using WASM template
* [go_wasm_exec_node.js](./go_wasm_exec_node.js): core code WASM run Nodejs.
