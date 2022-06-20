/**
 * 浅拷贝基础
 * Object.assign
 * ...  (扩展运算符)
 * Array.slice
 * Array.concat()
 *
 */

function shallowClone(target) {
  if (target === null || typeof target !== 'object') {
    return target
  }
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (let key in target) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget
}

/**
 * 深拷贝
 *1、JSON.stringify()
 *缺  会忽略 undefined
 *    会忽略 symbol
 *    不能序列化函数
 *    无法拷贝不可枚举的属性
 *    无法拷贝对象的原型链
 *    拷贝 RegExp 引用类型会变成空对象
 *    拷贝 Date 引用类型会变成字符串
 *    对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null
 *    不能解决循环引用的对象，即对象成环 (obj[key] = obj)。
 */
/**
 * 高级的深拷贝
 * 1、针对不可美枚举的属性和Symbol类型，可以使用Reflect.onKeys()获取所有的属性keys数组;
 * 2、针对Date和RegExp类型的数据，直接返回新的对象实例;
 * 3、针对属性的继承，Object.getOwnPropertyDescriptors()获取所有的属性描述，
 * 结合Object.create()方法创建新对象，并继承原来对象的原型链;
 * 4、利用WeakMap类型作为Hash表，因为WeapMap是弱引用类型，属性随时都可以被垃圾回收，
 * 可以有效避免内存泄漏，可以解决循环引用=>obj.c = obj;
 */

const cloneDeep = function (obj, hash = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (obj.constructor === Date) {
    return new Date(obj)
  }

  if (obj.constructor === RegExp) {
    return new RegExp(obj)
  }

  // 判断循环引用
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  //重新创建新对象，并赋值属性以及继承原型
  const descriptors = Object.getOwnPropertyDescriptors(obj)
  const cloneObj = Object.create(Object.getPrototypeOf(obj), descriptors)
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      typeof obj[key] === 'object' && obj[key] !== null
        ? cloneDeep(obj[key], hash)
        : obj[key]
  }

  return cloneObj
}

// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log('我是一个函数')
  },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
}

Object.defineProperty(obj, 'innumerable', {
  enumerable: false,
  value: '不可枚举属性',
})
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj // 设置loop成循环引用的属性
let cloneObj = cloneDeep(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)
