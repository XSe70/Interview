/**
 * 手写Object.create()方法
 * 用现有对象提供给新对象的__proto__
 * 
 * 第一个参数是现有的对象
 * 第二个参数，是给新对象添加属性，且进行属性描述对象的设置（初始化赋值、可修改、可删除、for in的枚举）
 */

function myCreate(o){
    const F = function(){}
    F.prototype = o
    return new F()
}

/**
 * 属性描述对象
 */
// {
//     value: 123, // 该属性的初始值
//     writable: true, // 属性是否可写
//     enumerable: true, // 是否可遍历   for...in || Object.keys()
//     configurable: true, // 是否可删除、修改
//     get(),
//     set()
// }
