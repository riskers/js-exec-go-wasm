package main

import (
	"strconv"
	"syscall/js"
)

// this 是 JavaScript 中的 this
// args  是在 JavaScript 中调用该函数的参数列表
func add(this js.Value, args []js.Value) interface{} {
	a, _ := strconv.Atoi(args[0].String())
	b, _ := strconv.Atoi(args[1].String())
	return a + b
}

func main() {
	js.Global().Set("add", js.FuncOf(add))

	// 创建一个空的非缓冲通道，并尝试从该通道中接受数据。
	// 因为没有人向它发送任何东西，它本质上是一个永久的阻塞操作，允许我们永远运行我们的程序。
	<-make(chan bool)
}
