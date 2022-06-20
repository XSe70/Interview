/**
 * 1、串接所有的this（通过return this的方式）
 * 2、把所有的任务放到任务队列里面
 * 3、通过一个方法有序执行队列里面的人物
 *
 * new Test('test').firstSleep(3).sleep(5).eat('dinner')
 *
 * 等待3秒
 * test
 * 等待5秒
 * dinner
 */

function Test(name) {
  this.name = name
  this.stack = []
  let fn = () => {
    console.log(name)
  }
  // 加入执行函数
  this.stack.push(() => {
    console.log('Hello,我是', this.name)
    //调用this.next()才能实现下一步自动执行
    this.next()
  })
  // 执行队列，因为需要队列完成后开始执行的next，执行完script代码后，
  // 在执行下一个宏任务的时候，执行this.next()
  setTimeout(() => {
    this.next()
  }, 0)
  return this
}

Test.prototype.next = function () {
  let fn = this.stack.shift() // 头节点出
  fn && fn()
}

Test.prototype.firstSleep = function (time) {
  this.stack.unshift(() => {
    setTimeout(() => {
      console.log('firstSleep等待', time)
      this.next()
    }, time)
  })
  return this
}

Test.prototype.sleep = function (time) {
  this.stack.push(() => {
    setTimeout(() => {
      console.log('sleep等待', time)
      this.next()
    }, time)
  })
  return this
}

Test.prototype.eat = function (food) {
  this.stack.push(() => {
    console.log('seat', food)
    this.next()
  })
  return this
}

new Test('test').firstSleep(3).sleep(5).eat('dinner')
