# js execute WASM complied by Golang or TinyGo

---

[中文说明](https://riskers.notion.site/Nodejs-Browser-Go-WASM-2bd0c234951342f4931ba44c05c17c54?pvs=4)

---

* Go Version: `go version go1.21.5 darwin/arm64`
* TinyGo Version: `tinygo version 0.30.0 darwin/amd64 (using go version go1.21.5 and LLVM version 16.0.1)`
* Nodejs Version: `v18.17.1`
* wasm [source code](./wasm/README.md)

## Official Golang solution

* [Golang](./solutions/golang/README.md)

## TinyGo solution

* [tinygo](./solutions/tinygo/README.md)

## Pack WASM

Universal wasm for Node and Browsers :) :

* [cross-wasm](./packages/cross-wasm/README.md)

## Example

* [Browser](./cross-examples/browser-using-wasm/)
  * [ESM](./cross-examples/browser-using-wasm/html/esm.html)
  * [UMD](./cross-examples/browser-using-wasm/html/umd.html)
  * [WebWorker](./cross-examples/browser-using-wasm/html/webworker.html)
  * [Webpack](./cross-examples/browser-using-wasm/html/webpack.html)
* [Nodejs](./cross-examples/nodejs-using-wasm/)
