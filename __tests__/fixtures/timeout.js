const { parentPort } = require('worker_threads')

async function task() {
  while(true) {}
}

parentPort.on('message', async msg => {
  parentPort.postMessage(await task(msg))
})