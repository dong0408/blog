---
title: 深or浅拷贝，带你从入门到精通 
date: 2022-12-24
author: 潘小七
tags:
 - 深浅拷贝
categories: 
 - JavaScript
isShowComments: true  
subSidebar: auto
---


# 前言

在JavaScript语言中，你是否分的清什么时候是深拷贝，什么时候是浅拷贝呢？到底我们拷贝完一个对象后，怎样的拷贝会导致新对象引起原对象改变，怎样的拷贝不会导致原对象随新对象改变呢？下面我就来介绍一下深浅拷贝吧。

# 浅拷贝的定义

顾名思义，浅拷贝拷贝出来的原对象里面的值会随着新对象改变而改变，也就是说浅拷贝是将引用地址拷贝给一个新的对象，所以当引用地址对应的值发生变化时，原对象和新对象都会改变。**简而言之就是两个对象共用一个引用地址**。

 # 深拷贝的定义

当我们知道了浅拷贝的定义后，那深拷贝既是拷贝出两个一模一样的两个对象，并且这两个对象更改自己的值不会影响另外一个对象里面的值,**也就是说深拷贝的两个对象不共用一个引用地址。**

# 实现深or浅拷贝的方法

##  浅拷贝

### 1、赋值
```
let a = {
     age: 1
 }
 let b = a
 a.age = 2
 console.log(b.age); // 2
 b.age = 3
 console.log(a.age); // 3
```
赋值就是一个很典型的浅拷贝，由于两个对象使用的是同一个引用地址，所以当值改变时，两个对象都会改变。
### 2. Object.assign()
```
let a = {
    like:{
        n1:'reading',
        n2:'runding'
    }
}
let b = Object.assign({},a)
a.like = {  //深拷贝   {like: { n1: 'reading', n2: 'runding' } }
    n3:'coding' 
}
a.like.n1 = 'coding' //浅拷贝  {like: { n1: 'coding', n2: 'runding' } }
console.log(b);
```
当我们使用`Object.assign()`拷贝一个对象后，**原对象第一层值变化时，新对象的值不会改变，为深拷贝。原对象非第一层值变化时，新对象的值会改变，为浅拷贝。**
### 3. 解构
```
let a = {
    age: 1,
    like: {
        n1: 'reading',
        n2: 'runding'
    }
}
let b = { ...a }
a.age = 2 //深拷贝
a.like.n1 = 'coding'   //浅拷贝
console.log(b);
```
`解构`方法与`Object.assign()`十分相似，可以参照`Object.assign()`的解释
## 深拷贝

### 1. JSON.parse() 和 JSON.stringify()
```
let a = {
    age: 1
}
let  c = JSON.parse(JSON.stringify(a))
a.age = 3
console.log(c.age); // 1
```
当我们使用`JSON.parse()` 和 `JSON.stringify()` 和对`c`赋值时，当原对象改变时，新对象不会随之改变。
#### 注意
```
let obj = {
    a:1,
    b:{
        c:2,
        d:3
    },
    e:undefined,
    f:Symbol('hello'),
    g:function(){}
}
let newobj = JSON.parse(JSON.stringify(obj))
console.log(newobj); //{ a: 1, b: { c: 2, d: 3 } }
```
还有一点要注意的就是`JSON.parse() 和 JSON.stringify()`**不能拷贝undefined、Symbol类型、函数。**

## 可深可浅方法
```
let arr = ['old', 1, true, null, undefined]
let newArr = arr.concat() //深拷贝
let newArr1 = arr.slice() //深拷贝
arr[0] = 'new'
console.log(newArr); // [ 'old', 1, true, null, undefined ]
console.log(newArr1); // [ 'old', 1, true, null, undefined ]
```
```
let arr = [{old:'old'},['old']]
let newArr = arr.concat()  //浅拷贝
let newArr1 = arr.slice()  //浅拷贝
arr[0].old = 'new'  
arr[1][0] = 'new'
console.log(newArr);
console.log(newArr1);
```
当arr为原始类型时，即为深拷贝，为引用类型时，即为浅拷贝。（和`Object.assign()`的原理很相似。）

# 手写深or浅拷贝的方法

## 浅拷贝
```
function shallowCopy(obj) {
    if(typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}
    for(let i in obj){
    if(obj.hasOwnProperty(i)){
        newObj[i] = obj[i]
    }
    }
    return newObj
}
let a =[{c:1},2,3,[2]]
let b = shallowCopy(a)
a[0].c = 222
console.log(b); // [ { c: 222 }, 2, 3, [ 2 ] ]
```
这里有一点我们要注意的就是，**在浅拷贝的方法里，原始类型还是为深拷贝。**
## 深拷贝
```
function deepCopy(obj) {
    if (typeof obj !== 'object') return  //递归结束条件
    let newObj = Array.isArray(obj) ? [] : {}; // 判断类型
    for (let i in obj) {
        if(obj.hasOwnProperty(i)){
            newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i] // 递归方法，进行拷贝
        }
    }
    return newObj;
}
let a =[{c:1},2,3,[2]]
let b = deepCopy(a)
a[0].c = 222
console.log(b);
```
深拷贝即时一层一层递归进行拷贝复制，实现了不会随原始值变化而变化的深拷贝。

# jQuery的extend方法
## 1. 介绍
`jQuery.extend()` 函数用于 **将一个或多个对象的内容合并到目标对象**。这一点与`Object.assign()`方法相似。

但extend方法还有一个特点就是 **可以通过第一个参数控制合并对象时为深拷贝还是浅拷贝。**


语法： *$* .extend( [deep ], target, object1 [, objectN ] )

*deep*    | 可选。 Boolean类型 指示是否深度合并对象，默认为false。如果该值为true，且多个对象的某个同名属性也都是对象，则该"属性对象"的属性也将进行合并。 |
| --------- | -------------------------------------------------------------------------------- 
| *target*  | Object类型 目标对象，其他对象的成员属性将被附加到该对象上。                                                |
| *object1* | 可选。 Object类型 第一个被合并的对象。                                                          |
| *objectN* | 可选。 Object类型 第N个被合并的对象。

## 2.实现
```
function extend() {
    let deep = false  // 默认为浅拷贝
    let length = arguments.length
    let target = arguments[0] || {}
    let i =  1  
    let options;
    //用户开启了深拷贝
    if(typeof target == 'boolean') {
        deep = target
        target = arguments[i] || {}
        i++
    }
    if(typeof target !== 'object') {
        target = {}
    }
    for(;i< length; i++){
        options = arguments[i]
        if(options != null) {
            for(let key in options) {
                //目标属性值
                let src = target[key]
                //要复制的对象属性值
                let copy = options[key]
                if(deep && copy && typeof copy == 'object'){
                    target[key] = extend(deep,src,copy) // 深拷贝
                }else if (copy !== undefined){
                    target[key] = copy // 浅拷贝
               }
            }
        }
    }
    return target
}
```
```
let obj1 = {
    a: 1,
    b:{b1:1,b2:2},
    e:{d:2}
}
let obj2 = {
    b:{b1:3,b2:4},
    c:3
}
let obj3 = {
    d:4
}
let newObj =  extend(false, {},obj1, obj2, obj3) //浅拷贝
let newObj1 =  extend(true, {},obj1, obj2, obj3) // 深拷贝
obj2.b.b1 = 33
obj2.b.b2 = 33
obj1.e.d = 0
console.log(newObj); // { a: 1, b: { b1: 33, b2: 33 }, e: { d: 0 }, c: 3, d: 4 }
console.log(newObj1); // { a: 1, b: { b1: 3, b2: 4 }, e: { d: 2 }, c: 3, d: 4 }
```