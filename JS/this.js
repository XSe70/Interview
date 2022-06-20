/**
 * this做了以下工作：
 * 1、创建一个新对象
 * 2、将新对象链接到构造函数的原型上，并绑定this（this指向新对象）
 * 3、执行构造函数代码（为新对象赋值属性）
 * 4、返回新对象
 * 
 * 注：new 关键词执行之后总是会返回一个对象，要么是实例对象，
 * 要么是 return 语句指定的对象
 */

function myThis (fn, ...args) {
  if(typeof fn !== 'function'){
      throw 'error'
  }
  const obj = {}
  obj.__proto__ = fn.prototype
  const res = fn.call(obj, ...args)
  return res instanceof Object ? res : obj
}

function call(context, ...args){
    const obj = context
    const fn = this
    if(typeof fn !== 'function'){
        throw 'error'
    }

    obj.fn = fn
    const res = obj.fn(...args)
    delete obj.fn
    return res
}

function apply(context, args){
    const obj = context
    const fn = this

    obj.fn = fn

    const res = obj.fn(...args)
    delete obj.fn
    return res
}

function bind(context, ...args1){
    const obj = context
    const fn = this

    return function F(...args2){
        if(this instanceof F){
            return new fn(...args1, ...args2)
        }else{
            return fn.call(obj, ...args1, ...args2)
        }
    }
}





/**
 * 1、=> 箭头函数的this只和定义的最近的this有关
 * 2、bind这类的重定向this，只和第一个绑定的bind参数有关
 * 3、优先级：new > bind这类 > obj.foo > foo()
 */


/**
 * 三种方式可以手动修改 this 的指向
 * call: fn.call(this, 1, 2)  =》直接执行
 * apply: fn.apply(this, [1, 2]) =》直接执行
 * bind: fn.bind(this)(1, 2) =》 返回执行函数
 */

Function.prototype.myCall = function(context) {
  const obj = context || window
  const args = [...arguments].slice(1)

  //给对象添加一个函数属性，执行完后删除这个属性
  obj.fn = this
  const res = obj.fn(...args)
  delete obj.fn
  return res
}

Function.prototype.myApply = function(context) {
  const obj = context || window
  const args = [...arguments].slice(1)[0]

  obj.fn = this
  const res = obj.fn(...args)

  delete obj.fn
  return res
}


Function.prototype.myBind = function(context) {
  const fn = this
  if(typeof fn !== 'function') {
    throw new TypeError('Error')
  }
  const _this = context
  const args = [...arguments].slice(1)

  //返回的是一个函数
  return function F() {
    //函数我们可以new F()，所以需要判断
    if(this instanceof F) {
      return new fn(...args, ...arguments)
    }
    return fn.call(_this, args.concat(...arguments))
  }
}


