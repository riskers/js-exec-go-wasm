# Golang syscall/js + `wasm_exec_node.js`

## Source Code

* [main.go](./main.go): Golang code
* [test.wasm](./test.wasm): a WASM file compiled from `main.go`. Bulid command: `GOOS=js GOARCH=wasm go build -o test.wasm main.go`

## Official Golang (`$(go env GOROOT)/misc/wasm/`)

* [wasm_exec.js](./wasm_exec.js): core code WASM run on Node.js and browser. `$(go env GOROOT)/misc/wasm/wasm_exec.js .`
* [wasm_exec.html](./wasm_exec.html):  browser using WASM template, run!
  > Notice: param of `add` method is string not number
  > ![](https://i.imgur.com/4qJ6g9a.png)
* [wasm_exec_node.js](./wasm_exec_node.js): Nodejs using WASM template, occur(deadlock)!

## Problems of Official Node.js ([Nodejs with WebAssembly](https://nodejs.dev/en/learn/nodejs-with-webassembly/))

* [nodejs_with_assembly.js](./nodejs_with_assembly.js): occur(`[TypeError: WebAssembly.instantiate(): Imports argument must be present and must be an object]`) !

So far, we found WASM that Golang compiled can run on browser but Node.js occurs.

## Solutions

Actually, we must make some changes in order to run WASM on Node.js.

* [wasm_exec_node_myself.js](./wasm_exec_node_myself.js): changed I make based on `wasm_exec_node.js`

Have Try:

```bash
> node ./wasm_exec_node_myself.js ./test.wasm add 1 222
```

Success!

In order to be used as a normal `npm` package:

* [run.js](./run.js): `shelljs` warpped command of Node.js to exec `wasm_exec_node_myself.js`
* [run.test.js](./run.test.js): test case of `run.js`

Done!