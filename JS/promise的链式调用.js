class myPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.err = undefined
    this.resolveQueue = []
    this.rejectQueue = []

    let resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value
        this.resolveQueue.forEach((fn) => fn(this.value))
      }
    }
    let reject = (err) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.err = err
        this.rejectQueue.forEach((fn) => fn(this.err))
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onResolve, onReject) {
    if (this.status === 'pending') {
      return new Promise((resolve, reject) => {
        onResolve =
          typeof onResolve === 'function'
            ? onResolve
            : function (value) {
                resolve(value)
              }
        onReject =
          typeof onResolve === 'function'
            ? onReject
            : function (e) {
                throw e
              }
        this.resolveQueue.push(() => {
          const res = onResolve(this.value)
          res instanceof Promise
            ? res.then(resolve, reject)
            : resolve(res || this.value)
        })

        this.rejectQueue.push(() => {
          const res = onReject(this.err)
          res instanceof Promise ? res.then(resolve, reject) : resolve(res)
        })
      })
    }

    if (this.status === 'resolved') {
      return Promise((reslove, reject) => {
        try {
          const res = onResolve(this.value)
          res instanceof Promise ? res.then(reslove, reject) : reslove(res)
        } catch (e) {
          reject(e)
        }
      })
    }

    if (this.status === 'rejected') {
      return Promise((reslove, reject) => {
        try {
          const res = onReject(this.err)
          res instanceof Promise ? res.then(reslove, reject) : reslove(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

const demo = new myPromise((resolve, reject) => {
  console.log('myPromise 完成')
  setTimeout(() => {
    console.log('settimeout')
    const obj = { age: 10 }
    resolve(obj)
  }, 1000)
})

demo
  .then((res) => {
    const obj = { name: '小明' }
    console.log('第一次调用then', res)

    return { ...res, ...obj }
  })
  .then((data) => {
    console.log('第二次调用then', data)
  })

// demo.then().then((data) => {
//   console.log('第二次调用then', data)
// })
