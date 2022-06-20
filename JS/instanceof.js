//注：js中的instanceof并不能判断基础类型

const myInstanceof = function (left, right) {
  // 获取判断类型的原型
  const target = right.prototype
  // 获取实例的原型
  left = left.__proto__
  while(true){
    if(!left){
      return false
    }
    if(left === target){
      return true
    }
    left = left.__proto__
  }
}

console.log((2).__proto__)