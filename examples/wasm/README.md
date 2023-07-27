# WASM SOURCE CODE

```bash
# Go build wasm
> GOOS=js GOARCH=wasm go build -o go.wasm

# TinyGo build wasm
> tinygo build -no-debug -o main.wasm -target=wasm main.go
```

## Go vs TinyGo

| wasm name | build command | size |
| -- | --  | -- | 
| `go.wasm` | `GOOS=js GOARCH=wasm go build -o go.wasm` | 390k | 
| `tinygo` | `tinygo build -no-debug -o main.wasm -target=wasm main.go` | 3.9M |

TinyGo limitation: https://tinygo.org/docs/reference/lang-support/stdlib/
