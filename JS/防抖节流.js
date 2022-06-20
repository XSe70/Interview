/**
 * 防抖
 * 在 n 秒内事件又被触发，重新计算，取最后一次的结果
 */
function debounce(fn, delay) {
  let timer = null
  return function () {
    const self = this
    const args = [...arguments]

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}

/**
 * 节流
 * 在 n 秒内，以第一次触发的结果为主
 */
function throttle(fn, delay) {
  //   let preTime = new Date()
  //   return function () {
  //     const self = this
  //     const args = [...arguments]
  //     const nowTime = new Date()
  //     if (nowTime - preTime >= delay) {
  //       preTime = nowTime
  //       return fn.apply(self, args)
  //     }
  //   }
  let timer = null
  return function () {
    const self = this
    const args = [...arguments]

    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
      timer = null
    }, delay)
  }
}
