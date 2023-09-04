# WASM SOURCE CODE

```bash
# Go build wasm
> GOOS=js GOARCH=wasm go build -o go.wasm

# TinyGo build wasm
> tinygo build -no-debug -o tinygo.wasm -target=wasm main.go
```

## Go vs TinyGo

| wasm name | build command | size | Support |
| -- | --  | -- | -- |
| `go.wasm` | `GOOS=js GOARCH=wasm go build -o go.wasm` | 4.0M | [with full language support](https://github.com/golang/go/wiki/WebAssembly#getting-started) |
| `tinygo` | `tinygo build -no-debug -o main.wasm -target=wasm main.go` | 393k | [targeting minimal size](https://tinygo.org/docs/reference/lang-support/stdlib/) |

