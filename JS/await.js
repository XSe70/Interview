/**
 * async/await的语法糖就是使用generator函数+自动执行器实现
 */

function test(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2)
    }, 1000)
  })
}

function asyncGen(fn) {
  const gen = fn()
  const next = function (val) {
    const { value, done } = gen.next(val)
    if (done) {
      return value
    }
    value.then((data) => {
      next(data)
    })
  }
  next()
}

const Gen = function* () {
  const a = yield test(1)
  console.log('a', a)
  const b = yield test(a)
  console.log('b', b)
}

asyncGen(Gen)
