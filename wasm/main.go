package main

import (
	"encoding/hex"
	"syscall/js"

	"github.com/ethereum/go-ethereum/crypto"
)

// This function is exported to JavaScript, so can be called using
// exports.add() in JavaScript.
//
// only support in TinyGo: https://tinygo.org/docs/guides/webassembly/wasi/
//
//export add
func add(a, b uint32) uint32 {
	return a + b
}

// complex example
// pass string and return string (can't pass bytes directly)
func Keccak256() js.Func {
	helperFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "invalid params"
		}
		data := args[0].String()
		hash := crypto.Keccak256([]byte(data))
		return hex.EncodeToString(hash)
	})
	return helperFunc
}

func main() {
	js.Global().Set("Keccak256", Keccak256())
	<-make(chan struct{})
}
