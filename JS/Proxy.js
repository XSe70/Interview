/**
 * Proxy在目标对象的外层搭建了一层拦截，外界对目标对象的
 * 某些操作，必须经过这层拦截
 */

const obj = {
  a: 3,
  b: 4,
}

const handlerObj = new Proxy(obj, {
  get: function (target, key) {
    console.log(`属性${key}被访问：${target[key]}`)
    return target[key]
  },
  set: function (target, key, value) {
    console.log(`设置属性${key}的值为：${value}`)
    target[key] = value
  },
})

console.log(handlerObj.a)
handlerObj.d = 'nnnn'
