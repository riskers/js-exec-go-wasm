package main

// https://tinygo.org/docs/guides/webassembly/wasi/

// This function is exported to JavaScript, so can be called using
// exports.add() in JavaScript.
//
//export add
func add(a, b uint32) uint32 {
	return a + b
}

func main() {}
