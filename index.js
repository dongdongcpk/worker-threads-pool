module.exports = {
  WorkerThreadsPool: require('./src/worker-threads-pool'),
  isTimeoutError: require('./src/promise-with-timer').isTimeoutError
}
