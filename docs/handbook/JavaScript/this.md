---
title: JavaScript的6种常用继承方式  
date: 2022-12-09
author: 潘小七
tags:
 - 继承
categories: 
 - JavaScript
isShowComments: true  
subSidebar: auto
---

## 前言
相信大家在写JS函数的方法时，都用过`this`关键字来给构造函数增加变量。但我们用`this`时我们都疑惑过，`this`到底绑定的是什么呢？`this`关键字是JS中最复杂的机制之一。它是一个很特别的关键字，在我们使用它时，它便被自动定义在了所有函数的作用域中。下面我就来和大家聊聊`this`的用法。

## this的绑定规则
#### - 默认绑定
 1.  this所处的词法作用域在哪里生效了，this就绑定在哪里。
 2.   在严格模式下，全局对象无法进行默认绑定，所以导致this只能绑定在undifined身上
   我们来看这段代码：
 ```
 function baz(){
    console.log('baz');
    bar()
}
function bar(){
    console.log('bar');
    foo()
}
function foo(){
    console.log('foo');
    console.log(this);
}
baz()
```
我们定义了三个函数`foo`、`bar`、`baz`，我们在`foo`函数中打印`this`，再在`bar`中调用`foo`函数，再在`baz`中调用`bar`函数，最后我们执行`baz`。因为这`baz`函数是在全局对象`window`上定义的，所以这里的打印的`this`指代的就是全局对象`window`。这便是是`this`的默认绑定规则。但要注意的一点就是如果在baz函数中加入`'use strict'`代码进入严格模式时,`this`将无法默认绑定在全局对象中，导致`this`只能绑定在`undifind`身上.
，
![屏幕截图(75).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8b3f36064b548e09830499d40ca1f70~tplv-k3u1fbpfcp-watermark.image?)
#### - 隐式绑定
1.  当函数引用有上下文对象时，隐式绑定的规则就会把函数调用中的this绑定到这个上下文对象。
我们来看这段代码
```
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo: foo
}
obj.foo()
```
我们定义了`foo`函数、`obj`对象。我们在`obj`对象中定义`foo:foo`键值对,将`foo`函数在`obj`对象中引用，之后我们在来在外面执行`foo`函数。在这种情况下，我们`this.a`打印的值就是`2`了。这就是因为当我们在`obj`对象引用`foo`函数时，`this`会隐式绑定在这个有执行上下文的`obj`对象上。所以当我们执行`foo`函数时，`this.a`自然就找到了`obj`对象中定义的`a`。这便是是`this`的隐式绑定规则。

![屏幕截图(77).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21c66b5b1bb54785bfe256ebe6003a3b~tplv-k3u1fbpfcp-watermark.image?)
#### - 隐式丢失
1.  当隐式绑定的函数丢失了绑定对象，就会应用默认绑定。
我们来看这段代码
```
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
    foo:foo
}
var bar = obj.foo
var a = 'global'
bar()
```
我们定义了`foo`函数、`obj`对象，但在外面我们又定义`bar`赋值`obj.foo`，之后我们在调用`bar`执行`foo`函数。在这种情况下`this.a`打印出来结果就是`global`。那为啥这里打印不是`2`呢？因为我们在`obj`对象中引用`foo`函数后，`obj`并没有执行`foo`函数，而是把它又丢给了`bar`，让`bar`变量执行了`foo`函数。`this`的隐式绑定就丢失了对象，从而又默认绑定在了`window`上了。自然在打印`this.a`时，`this`找到的`a`就是在全局定义的`a`了。这便是`this`的隐式丢失规则。

![屏幕截图(76).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a883f463a6a5478eaa09b2c47d308293~tplv-k3u1fbpfcp-watermark.image?)
#### - 显式绑定
1.  call，apply，bind方法可以强行指定函数的this对象
我们看这段代码：
```
function foo(){
    console.log(this.a);
}
var obj = {
    a:2,
}
foo.call(obj)
    ||foo.apply(obj)
    ||var bar = foo.bind(obj)
      bar()

```
我们定了`foo`函数、`obj`对象，如果现在直接调用`foo`函数，打印出来的`a`就是`undifind`。但是如果我们使用`foo.call(obj)` || `foo.apply(obj)` || `foo.bind(obj)`就可以强行将`this`指代的对象改为`obj`。让`this.a`打印出`2`。这便是`this`的先绑定规则。要注意的一点就是使用`bind`方法时返回的是个新的对象，要再次调用`bar`。

![屏幕截图(78).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc264152853e470c8c4ee0671b2599c9~tplv-k3u1fbpfcp-watermark.image?)
## 小结
在我们使用`this`指代对象时，我们要分清到底是调用还是引用。只要我们能搞清`this`到底在什么地方引用了又在设么地方调用了。我们就可以清楚的知道`this`指代的对象到底是谁。自然也就能灵活运用`this`。