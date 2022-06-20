function myPromise(constructor) {
  this.status = 'pending'
  this.value = undefined
  this.error = undefined

  this.onFulfilled = [] //用于存储异步执行的回调  setTimeOut
  this.onRejected = [] //用于存储异步执行的回调

  let resolve = (value) => {
    if (this.status === 'pending') {
      this.status = 'resolved'
      this.value = value
      this.onFulfilled.forEach((fn) => fn(this.value))
    }
  }

  let reject = (err) => {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.error = err
      this.onRejected.forEach((fn) => fn(this.error))
    }
  }

  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === 'resolved') {
    typeof onFulfilled === 'function' && onFulfilled(this.value)
  }
  if (this.status === 'rejected') {
    typeof onRejected === 'function' && onRejected(this.reason)
  }
  if (this.status === 'pending') {
    typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
    typeof onRejected === 'function' && this.onRejected.push(onRejected)
  }
}

var myP = new myPromise(function (resolve, reject) {
  console.log('执行')
  setTimeout(function () {
    resolve(3)
  }, 1000)
})

myP.then(
  function (res) {
    console.log('res', res)
  },
  function (err) {
    console.log('err', err)
  }
)

/**
 * Promise.all
 * 全部执行成功进入then，失败进入catch，可能其他的还没执行完
 */

Promise.prototype.all = function (arr) {
  return new Promise((resolve, reject) => {
    let count = 0
    let res = []
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          count++
          res[i] = value
          if (count === arr.length) {
            resolve(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

/**
 * Promise.rase
 * 返回最快执行完的结果
 */

Promise.prototype.race = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      //   arr[i].then(resolve, reject)
      Promise.resolve(arr[i])
        .then((value) => {
          resolve(value)
        })
        .catch((e) => [reject(e)])
    }
  })
}
