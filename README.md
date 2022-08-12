Nodejs execute WASM that Golang compiled.

* Go Version: `go1.18.3 darwin/arm64`
* Nodejs Version: `v16.15.1`

**Source Code**:

* [main.go](./main.go): Golang code
* [test.wasm](./test.wasm): WASM file compiled by `main.go`

**Official Golang provide** (`$(go env GOROOT)/misc/wasm/`):

* [wasm_exec.js](./wasm_exec.js): core code WASM run on Node.js and browser
* [wasm_exec.html](./wasm_exec.html):  browser using WASM template, run!
  > Notice: param of `add` method is string not number
  > ![](https://i.imgur.com/4qJ6g9a.png)
* [wasm_exec_node.js](./wasm_exec_node.js): Nodejs using WASM template, occur(deadlock)!

**Official Node.js provide** ([Nodejs with WebAssembly](https://nodejs.dev/learn/nodejs-with-webassembly)):

* [nodejs_with_assembly.js](./nodejs_with_assembly.js): occur(`[TypeError: WebAssembly.instantiate(): Imports argument must be present and must be an object]`) !

---

So far, we found WASM that Golang compiled can run on browser but Node.js.

Actually, we must make some changes in order to run WASM on Node.js:

* [wasm_exec_node_myself.js](./wasm_exec_node_myself.js): changed I make based on `wasm_exec_node.js`

Have Try:

```bash
> node ./wasm_exec_node_myself.js ./test.wasm add 1 2
```

Success!

In order to be used as a normal `npm` package:

* [run.js](./run.js): `shelljs` warpped command of Node.js to exec `wasm_exec_node_myself.js`
* [run.test.js](./run.test.js): test case of `run.js`

Done!
