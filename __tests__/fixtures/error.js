const { parentPort } = require('worker_threads')

process.once('unhandledRejection', err => {
  throw err
})

async function task(n) {
  if (n < 0) {
    throw new Error('err')
  }
  return n + 1
}

parentPort.on('message', async msg => {
  parentPort.postMessage(await task(msg))
})