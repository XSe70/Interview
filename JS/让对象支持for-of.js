/**
 * 方法一：
 * 手动给对象添加一个迭代器
 */
var myObject = { a: 1, b: 2, c: 3 }

myObject[Symbol.iterator] = function () {
  const _selft = this
  let index = 0
  const keys = Object.keys(_selft)
  return {
    next: function () {
      return {
        value: _selft[keys[index++]],
        done: index > keys.length,
      }
    },
  }
}

/**
 * 方法二：标准写法，可以指定属性描述符
 */
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function () {
    const _selft = this
    let index = 0
    const keys = Object.keys(_selft)
    return {
      next: function () {
        return {
          value: _selft[keys[index++]],
          done: index > keys.length,
        }
      },
    }
  },
})
