Nodejs execute WASM Golang built occur error.

> Note: https://riskers.notion.site/Nodejs-Go-WASM-2e69fc4451f04f0a9771c18bbf68f923

* `main.go`: WASM 源文件
* `test.wasm`: 由 `main.go` 编译的 WASM 文件
* `wasm_exec.js`: 核心模块，Nodejs 和浏览器都需要使用
* `wasm_exec.html`:  浏览器使用 WASM 模板
* `wasm_exec_node.js`: Nodejs 使用 WASM 模板
* `nodejs_with_assembly.js`: 按照 Nodejs 官方文档 [Nodejs with WebAssembly](https://nodejs.dev/learn/nodejs-with-webassembly) 执行错误


> Go Version: `go1.18.3 darwin/arm64`