const Pool = require('./pool')
const PoolWorker = require('./pool-worker')

module.exports = class WorkerThreadsPool extends Pool {
  /**
   * @param { Number } opt.size number of workers
   * @param { String } opt.task path of worker file
   * @param { * } opt.workerData data to pass into workers
   * @param { Object } opt.resourceLimits resource constraints inside workers
   */
  constructor({ size, task, workerData, resourceLimits }) {
    super(size)
    this.fill(() => new PoolWorker(task, { workerData, resourceLimits }))
  }

  /**
   * choose a idle worker to run the task
   * with param provided.
   * @param { * } param
   * @param { number } opt.timeout timeout in ms for the task. 0 stands for no limit.
   */
  exec(param, timeout = 0) {
    return this.runTask(param, timeout)
  }
}
