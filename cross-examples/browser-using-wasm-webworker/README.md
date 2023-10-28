# Browser using wasm with webworker

If some functions are synchronous, and operations such as network requests may take some times which would hang if run on the browser main thread.

`WebWorkers` support both synchronous http requests and also working excellent for long running operations. If the main thread is hang in the browser, you would use the WebWorker to solve the problem.

## build

```bash
> npm run build
```

## run

```bash
> npm run start
```