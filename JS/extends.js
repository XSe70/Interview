/**
 * 继承  JS中不存在class, class只是语法糖,本质还是函数
 */

/**
 * 原型链继承
 * 将父类的实例作为子类的原型
 * 缺： 实例使用的是同一个原型对象
 * 1、来自原型对象的所有属性被所有实例共享，无法实现多继承
 * 2、无法向父类构造函数传参
 */
function Parent1() {
  this.name = 'parent1'
  this.play = [1, 2, 3]
}
function Child1() {
  this.type = 'child1'
}
Child1.prototype = new Parent1()
const child1 = new Child1()
const child2 = new Child1()
child1.play.push('更改了')

console.log('child1=', child1.play, '---child2=', child2.play, child1)

/**
 * 构造继承
 * 复制父类的实例属性给子类
 * 缺：
 * 1、只能继承父类的实例属性和方法，不能继承原型属性和方法
 * 2、每个子类都有父类实例函数的副本、影响性能
 */
function Parent2(name) {
  this.name = name
}

function Child2(type, name) {
  Parent2.call(this, name)
  this.type = type
}

/**
 * 组合继承
 * 将构造函数继承和原型链继承结合起来
 * 缺：
 * 1、子类原型链上存在父类的构造函数，消耗内存,Parent3的构造函数都会多执行一次
 */
function Parent3(name) {
  this.name = name
}
Parent3.prototype.getName = function () {
  return this.name
}
function Child3(type, name) {
  Parent3.call(this, name)
  this.type = type
}
Child3.prototype = new Parent3()
// Child3.prototype = Parent3.prototype

console.log(new Child3('aa', 'aa'))

/**
 * 寄生组合继承
 * 主要优化组合继承的问题
 */
function Parent4(name) {
  this.name = name
}
Parent4.prototype.getName = function () {
  return this.name
}
function Child4(type, name) {
  Parent4.call(this, name)
  this.type = type
}

// Child4.prototype.__proto__ = Parent4.prototype
Child4.prototype = Object.create(Parent4.prototype) //建立继承关系
Child4.prototype.constructor = Child4
// 修改constructor的指向

/**
Child4.prototype = Object.create(Parent4.prototype, {
    constructor: {
        value: Child4,
        enumerable: false,
        writable: true,
        configurable: true  
    }
})
 */

console.log(new Child4('bb', 'bb'))
