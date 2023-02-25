---
title: 快速理解JS中原型+原型链 
date: 2022-07-19
author: 潘小七
tags:
 - 八股文
categories: 
 - JavaScript
isShowComments: true  
subSidebar: auto
---
## 前言
首先我们来了解了解原型和原型链的概念：
- 原型的定义，原型叫`prototype`是函数`function`对象的一个属性，它是构造函数（new运算符调用的函数）制造出来的对象的公共祖先,通过构造函数产生的对象可以继承到该原型的属性和对象，原型也是对象。`prototype`也称为函数的原型（显示原型）；
-  `__proto__`(或者`[[prototype]]`)实例对象的原型，也成为隐式原型。同时实例对象的隐式原型等于构造函数的显示原型
- `constructor`是让构造函数构造出来的所有的对象都能找到自己的构造器。
- 原型链的定义：将原型以链表的方式连接起来，就形成了原型链，访问顺序按链表的顺序依次访问。
- 两者的区别：对象的原型（`__proto__`）与构造函数的原型(prototype)属性之间性质不一样。前者是每个实例上都有的属性，后者是构造函数的属性。

## 原型
- 首先，我们先来见识见识原型。
```
//person.prototype ---原型

Person.prototype.name = 'weige'
function Person(){
    this.name = 'wn'
}
var person = new Person()
console.log(person);
```

![微信图片_20220719094620.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd0332e109084dd29a7a72f62d2215b2~tplv-k3u1fbpfcp-watermark.image?)
    如图所示，我们将构造函数`Person`的原型浏览器上打印，可以清楚地看到原型的‘庐山真面目’。在上面这段代码中，我们向原型添加了两个`name`属性，其中用`Person.prototype`显示原型的方法添加到了`person`的隐式原型。用`this.name`的方法就直接添加到了`Person`对象上。同时我们还可以看到原型的构造器函数`constructor`，记录着构造出的`Person`函数的显式原型。
- 接下来，我们来聊聊隐式原型和显示原型。
```
Person.prototype.name = 'wn'
function Person(){
}
var person = new Person()
console.log(person.__proto__);
```

![微信图片_20220719175647.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d5be1f94f554373855f8c9d54da41c4~tplv-k3u1fbpfcp-watermark.image?)
    如图所示，我们构造了一个`Person`函数，我们向函数`Person`的显式原型中添加一个属性`name`且值为`wn`，现在我们去直接打印`person`的隐式原型。我们在`person`的隐式原型中看到`{name:'wn'}`，为什么我们向对象的显示原型添加属性，却没出现在`Person`对象中，而出现在`perosn`的隐式原型中呢。这时候我们应该这么认为“`实例对象隐式原型等于构造函数显示原型`”。
- 在了解完原型后，我们来看看原型的基本用法
 ```
//增
    function Person(){}
    Person.prototype.lastname ='pan'
//删
    function Person(){}
    Person.prototype.lastname ='pan'
    delete Person.prototype.lastName
//改
    function Person(){}
    Person.prototype.lastname ='pan'
    Person.prototype.lastname ='zhang'
//查
    function Person(){}
    Person.prototype.lastname ='pan'
    var person = new Person()
    console.log(person.lastname);
 ``` 
 原型的基本用法为‘增删改查’，和对象的用法一样，但是要注意的一点原型‘增删改查’是对构造函数的显式原型prototype进行操作，将键值对增加到实例对象的隐式原型中。
 ## 原型链
在了解完原型后，我们再来看看原型链是怎样的呢？那我们就上图来分析分析吧。

![60B47CCF-F24E-42D8-8ECE-692DEE5E1CA5.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aef3da71e5e14bfb8b145770cfcde23a~tplv-k3u1fbpfcp-watermark.image?)
想要理解原型链，我们只要看懂这张图。下面我来带大家分析分析。

首先我们构造`function Foo()`函数，函数Foo的显式原型为`Foo.prototype`,函数Foo的隐式原型就是`_proto_`；

**（实例对象的隐式原型 === 构造函数的显式原型。）** 

而构造函数`Foo`的隐式原型`（ __ proto __ ）`指向`Object.prototype`，因为所有的构造函数的显示对象的隐式原型都会指向对象`Object`。

**（所有function函数是通过Function函数构造出来的）**

那么下面我们看看为什么`function Function()`和`Function.prototype`会形成环装结构，首先因为`Function`是一个函数，函数就是一种对象，就会有隐式原型属性和显示原型属性。既然是函数，那么它一定是被`Function`创建。所以`function Function()`的显式原型一定是`Function.prototype`，那接下来就是理解`function Function()`的隐式原型还是`Function.prototype`了。

既然是函数是被`Function`函数构造出来的，那么我们也可以把`function Function()`看成一个实例对象，实例对象的隐式原型不就是构造函数`Function`的显式原型吗？`Function.prototype`也是一个对象的显示原型，所以它的隐式原型也就自然指向`Object.prototype`

最后因为对象也是被构造函数创建出来的，所以`function Object()`的隐式原型就是构造函数的显式原型`Function.prototype`，当然函数对象的显式原型就是`Object.prototype`,构造函数new出来的实例对象的隐式原型就`Object.prototype`； 因为万物皆对象，所以`Object.prototype`是最顶端了，它的隐式原型就指向了`null`。

