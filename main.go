package main

import (
	"strconv"
	"syscall/js"
)

// this: JavaScript's this
// args: JavaScript's function params
func add(this js.Value, args []js.Value) interface{} {
	a, _ := strconv.Atoi(args[0].String())
	b, _ := strconv.Atoi(args[1].String())
	return a + b
}

func main() {
	js.Global().Set("add", js.FuncOf(add))

	// Create an empty non-buffered channel and try to accept data from it.
	// Since no one sends anything to it, it is essentially a permanent blocking operation, allowing us to run our program forever. Create an empty non-buffered channel and try to accept data from it.
	<-make(chan bool)
}
