---

[中文说明](https://riskers.notion.site/Nodejs-Go-WASM-2e69fc4451f04f0a9771c18bbf68f923)

---

Nodejs execute WASM that Golang compiled.

* Go Version: `go1.18.3 darwin/arm64`
* Nodejs Version: `v16.15.1`

## Official Golang solution

* [Golang syscall/js](./examples/golang/README.md)

## WASM runtime solution

Here are some wasm runtime solutions:

* [tinygo+wasmer](./examples/tinygo-wasmer/README.md)

## Pack WASM

Universal wasm for Node and Browsers:

* [cross-wasm](./packages/cross-wasm/README.md)