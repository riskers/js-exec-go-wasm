import * as Comlink from 'comlink'
const init = async () => {
  const someFunction = Comlink.wrap(new Worker('worker.js'))
  // @ts-ignore
  await someFunction(Comlink.proxy((e) => {
    console.log('res is ', e)
  }))
}

init()
