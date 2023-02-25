---
title: 你会写显示绑定方法吗？
date: 2022-12-10
author: 潘小七
tags:
 - 八股文
categories: 
 - JavaScript
isShowComments: true  
subSidebar: auto
---



# 1. 前言 
对于JavaScript开发者来说，this [不熟悉的小伙伴点这里](https://juejin.cn/post/7118703212047106055) 是一个让我们头疼的关键字。但当我们真的学会this这个机制之后，就觉得它是真的香。下面我就来介绍this**显示绑定call()、apply()、bind()** 三种方法吧。

# 2. call() 方法
定义： 调用一个对象的方法，以另一个对象换当前对象，可将一个函数的对象上下文从初始的上下文改变为由`thisObj` 指定的新对象。

语法： **Function.call(thisObj, arg1, arg2, ....)**

说明:
- 如果没提供`thisObj`参数，则会指向全局`Window`。
- `call`接受多个参数为`Function`的参数，调用后返回`Funtion`函数的执行结果。

实现`call`关键因素：
- 使Funtion 函数的this指向thisObj。
- 将Funtion 函数执行，同时将后序参数作为funtion的参数，若有返回值则返回。
```
Function.prototype.my_call = function() {
  if (typeof this !== 'function') { // 优化函数才可以调用`call`
    throw new TypeError('error')
  }
  let obj = arguments[0]
  const args = Array.prototype.slice.call(arguments, 1) // 第一个函数以外的参数
  obj = obj || window  // 防止没传第一个参数
  const fn = Symbol('fn') // 声明 唯一变量 fn
  obj[fn] = this // 改变函数this指向（关键代码）
  const result = obj[fn](...args)  // 调用函数（关键代码）
  delete obj[fn] // 删除 obj 上的 fn 属性
  return result  // 返回函数执行结果
}
```
```
var name = 'zhangsan'
var obj = {
  name: 'lisi',
  fn: 123
}
//我们实现
const res = foo.my_call(obj, 1, 2) 
console.log(res); //  lisi 3 
 // 官方
const res1 = foo.call(obj, 1, 2) //  lisi 3 
console.log(res1); //  lisi 3 
```
# 3. apply() 方法
定义： 与call方法相同，但apply第二个参数接受一个数组。

语法： **Function.call(thisObj, [arg1, arg2, ...])**

说明:
- 如果没提供`thisObj`参数，则会指向全局`Window`。
- `apply`第二个参数为数组，调用后返回`Funtion`函数的执行结果。

实现`apply`关键因素：
- 使Funtion 函数的this指向thisObj。
- 将Funtion 函数执行，同时将第二个参数作为Funtion的参数，返回Function的执行结果。
```
Function.prototype.my_apply = function(obj, args) {
  if (typeof this !== 'function') { // 优化函数才可以调用`apply`
    throw new TypeError('error')
  }
  obj = obj || window  // 防止没传第一个参数
  const fn = Symbol('fn') // 声明 唯一变量 fn
  obj[fn] = this  // 改变函数this指向（关键代码）
  const res = obj[fn](...args)  // 调用函数（关键代码）
  delete obj[fn] // 删除 obj 上的 fn 属性
  return res // 返回函数执行结果
}
```
```
var name = 'zhangsan'
var obj = {
  name: 'lisi',
  fn: 123
}
//我们实现
const res = foo.my_apply(obj, [1, 2]) 
console.log(res); //  lisi 3 
 // 官方
const res1 = foo.aplly(obj, [1, 2]) //  lisi 3 
console.log(res1)  //  lisi 3 
```
# 4. bind() 方法
定义： 与call方法相同, 可接受任意参数。

语法： **Function.call(thisObj, arg1, arg2, ...)**

说明:
- 如果没提供`thisObj`参数，则会指向全局`Window`。
- `bind`接受任意个参数，调用后返回一个新的绑定函数。

实现`bind`关键因素：
- 使Funtion 函数的this指向thisObj。
- 将Funtion 函数执行，同时其他参数作为Funtion的参数, 返回一个新的绑定函数。
- **如果 new 了返回的新的绑定的函数，该函数的this需要指向Function函数而不是thisObj。**
```
Function.prototype.my_bind = function(obj) {
  if (typeof this !== 'function') { // 优化函数才可以调用`bind`
    throw new TypeError('error')
  }
  obj = obj || window  // 防止没传第一个参数
  const args = Array.prototype.slice.call(arguments, 1)  // 第一个函数以外的参数
  const _this = this 
  const pro = function() {}
  if (this.prototype) {
    pro.prototype = this.prototype
  }
  const bound = function () { // 声明一个bound函数
    // 判断该函数是否被new
    return _this.apply(  // 掉用 apply 方法改变 this指向
      this instanceof pro ? this : obj, // 判断 bound 函数时候被 new 了  如果 new this 指向foo 反之，指向 obj
      args.concat(Array.prototype.slice.call(arguments))
    )
  }
  bound.prototype = new pro() //  bound 函数的原型继承到了foo的原型  (原型链继承)
  return bound // 返回 bound 函数
}
```
```
var name = 'zhangsan'
var obj = {
  name: 'lisi',
  fn: 123
}
function foo(a, b) {
  console.log(this.name, a + b);
  return a + b
}
// 自己实现
const bar = foo.my_bind(obj)
console.log(bar());
 let bar1 = new bar(3, 4)
 console.log(bar1);
// 官方
const bar2 = foo.bind(obj)
console.log(bar2());
let bar3 = new bar(3, 4)
console.log(bar3);
```

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d17bba193f941138cfc1d4b16eb61be~tplv-k3u1fbpfcp-watermark.image?)
# 5. 结语

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91c95b94453247eeb0f4f7f946083a33~tplv-k3u1fbpfcp-watermark.image?)
在不同的开发环境下，我们灵活的运用这三种显示绑定方法，可以使**我们的this永远不会丢失。**