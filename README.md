# worker-threads-pool

Simple worker threads pool using Node's worker_threads module.

## Installation

```bash
npm install @wac/worker-threads-pool
```

## API

### Class: WorkerThreadsPool

#### `new WorkerThreadsPool(opt)`

* `opt` `<Object>`
  * `size` `<Number>` Number of workers
  * `task` `<String>` A absolute path of worker file
  * `workerData` `<Any>` Data to pass into workers
  * `resourceLimits` `<Object>` Resource constraints inside workers

#### `WorkerThreadsPool.exec(param[, timeout])`

* `param` `<Any>` The param your worker script need
* `timeout` `<Number>` Timeout in milisecond for limiting the execution time. When timeout, the function will throw a TimeoutError, use isTimeoutError function to detect it.
* Returns: `<Promise>`

#### `WorkerThreadsPool.destroy()`

Call `worker.terminate()` for every worker in the pool and release them.

