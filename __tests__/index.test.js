const Pool = require('../src/pool')
const { WorkerThreadsPool, isTimeoutError } = require('..')
const os = require('os')
const numCPU = os.cpus().length
const path = require('path')

describe('pool tests', () => {
  test('should throw error if size is not number', () => {
    expect(() => {
      new Pool('a')
    }).toThrowError(TypeError)
  })

  test('should throw error if size is NaN', () => {
    expect(() => {
      new Pool(NaN)
    }).toThrowError(`'size' must not be NaN!`)
  })

  test('should throw error if size < 1', () => {
    expect(() => {
      new Pool(0)
    }).toThrowError(RangeError)
  })

  test('should throw error if pool is deprecated', async () => {
    const pool = new Pool(5)
    pool.destroy()
    try {
      await pool.runTask()
    } catch (err) {
      expect(err.message).toBe(
        'This pool is deprecated! Please use a new one.'
      )
    }
  })
})

describe('pool tests', () => {
  test('test worker file', async () => {
    const workerData = 100

    const pool = new WorkerThreadsPool({
      task: path.join(__dirname, './fixtures/add.js'),
      size: numCPU,
      workerData,
    })

    const paramArr = [0, 11, 12, 13, 14]
    const expectResArr = paramArr.map((n) => n + workerData)
    const execArr = paramArr.map((n) => pool.exec(n))
    const resArr = await Promise.all(execArr)
    expect(resArr).toEqual(expectResArr)

    pool.destroy()
  })
})

describe('error tests', () => {
  test('error pool test', async () => {
    const pool = new WorkerThreadsPool({
      size: numCPU,
      task: path.join(__dirname, './fixtures/error.js')
    })

    for (let i = 0; i < numCPU; i++) {
      try {
        await pool.exec(-1)
      } catch (err) {
        expect(err.message).toBe('err')
      }
    }

    for (let i = 0; i < numCPU; i++) {
      const res = await pool.exec(i)
      expect(res).toBe(i + 1)
    }

    pool.destroy()
  })
})

describe('timeout tests', () => {
  let pool
  afterEach(() => pool.destroy())

  test('test pool with timeout', async () => {
    pool = new WorkerThreadsPool({
      size: numCPU,
      task: path.join(__dirname, './fixtures/timeout.js')
    })

    try {
      await pool.exec(null, 1000)
    } catch (err) {
      expect(isTimeoutError(err)).toBe(true)
    }
  })
})
