---
title: ES6——promise对象  
date: 2022-07-20
author: 潘小七
tags:
 - ES6
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

## Promise的含义
`Promise` 是针对于异步编程的一种解决方案，在`Pormise`没有被提出之前，我们处理异步代码都是用回调函数的方法，但大量的回调函数会引起内存泄露，导致代码的执行速度下降。`Promise`相比于传统的解决方案——回调函数和事件——更加合理和强大。所以在中ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。
## Promise的基本用法
 `Promise`函数接收一个函数作为参数，这个函数可以有两个参数，一个是成功函数(`resolve`)，一个是失败函数(`reject`)。Promise的.then接收两个回调函数，一个是成功函数的回调，一个是失败函数的回调。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
 ```
    const myPromise = new Promise(function (resolve, reject) {
        resolve()
        reject()
    });
    myPromise.then(function (value) { //成功
        console.log('success');
    }, function (error) { //失败
        console.log('file');
    })

 ```
`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。`Promise`对象中的状态不会被外界干扰。状态的改变取决于异步的操作结果。成功即执行`reslove`函数，失败即执行`reject`。且`Promise`对象的状态一旦被改变，就不会进行再次改变。
 
## Promise的方法
1.Promise.prototype.then()

then方法的返回结果是`新的Promise实例`，对象状态由回调函数的执行结果决定。then方法后面还可以再调用另一个then方法，形成链条。采用`链式的then`，可以指定一组`按照次序调用`的回调函数。
```
function xq() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('相亲了！');
        resolve('ok')
      }, 2000)
    })
  }
function marry() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('结婚了');
        resolve('好开心')
      }, 1000)
    })  
  }
function baby() {
   setTimeout(() => {
      console.log('出生了！');
    }, 500)
  }
  xq()
    .then(marry)
    .then(baby)
```

![微信图片_20220720185056.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8b947f03860427580edbc92c895f727~tplv-k3u1fbpfcp-watermark.image?)

在上面这段异步代码中，当我想让他们按照相亲、结婚、出生的顺序执行的话，我们就要给他们加上`promise`对象，当我们在调用`xq`函数时我们在后面加入`.then`方法返回一个`新的promise对象`执行`marry`函数，再在`marry`函数中加入`.then`方法再返回一个`新的promise对象`执行`baby`函数。让它的执行顺序为相亲、结婚、出生。

2.Promise.prototype.catch()

catch()用于指定发生错误时的回调函数,在下面这段代码中，我们用`a.catch(funtion(error))`将上面`promise`中的失败函数的结果打印出来了。
```
function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aaa');
      reject('fail');
    }, 1000)
  });
}
a().catch(function (error) {
  console.log(error);
})
```

![微信图片_20220720192052.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13a7675670804eb28d74d26bbfbe693d~tplv-k3u1fbpfcp-watermark.image?)

3.Promise.prototype.finally()

`finally()`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。而且`finally`方法总是会返回原来的值。在下面这段代码中，`a`函数虽然回调失败，返回了`reject`，但是`c`函数还是执行了。
 ```
 function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aaa');
      reject('fail');
    }, 1000)
  });
}
function c() {
  setTimeout(() => {
    console.log('ccc');
  }, 500)
}
a().finally(c)
 ```
 
![微信图片_20220720193451.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58a1bf4a256b487cafa8795bcbb5a11e~tplv-k3u1fbpfcp-watermark.image?)
4.Promise.all()

`all()`是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。接收一个数组作为参数，数组的每一项都是`Promise`对象的实例。如果不是，会通过`Promise.resolve()`将参数转为`Promise`实例，再进行处理。`all()用于将多个 Promise 实例，包装成一个新的 Promise 实例`。在下面这段代码中，只有`all()`所有的`promise`实例执行完，`C`函数就会执行。
```
function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aaa');
      resolve('ok');
    }, 1000)
  });
}
function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('bbb');
      resolve('ok');
    }, 2000)
  });
}
function c() {
  setTimeout(() => {
    console.log('ccc');
  }, 500)
}
 Promise.all([a(), b()]).then(c)
```

![微信图片_20220720200602.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565c6f5b04b348ae9d60e794837961cf~tplv-k3u1fbpfcp-watermark.image?)
5.Promise.race()

`race()`是将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。接收一个数组作为参数，数组的每一项都是`Promise`对象的实例。如果不是，会通过`promise.resolve()`将参数转为`Promise`实例，再进行处理。`只要参数的Promise实例有一个率先改变状态，则状态改变`。在下面这段代码中，只要`race()`有一个`promise`实例执行完，`C`函数就会执行。
```
function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aaa');
      resolve('ok');
    }, 1000)
  });
}
function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('bbb');
      resolve('ok');
    }, 2000)
  });
}
function c() {
  setTimeout(() => {
    console.log('ccc');
  }, 500)
}
 Promise.race([a(), b()]).then(c)
```

![微信图片_20220720200703.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76df3cd210b24591ba85302bd2a400a6~tplv-k3u1fbpfcp-watermark.image?)
##  Promise的应用场景和不足之处
Promise的应用场景具体有：
1. Ajax请求
2. 文件读取
3. 图片加载
4. 函数封装

上述这几个场景中，基本都涉及成功和失败。我们可以用Promise同时对其成功或失败进行不同的处理。使我们的代码可以处理更多不同的情况。

Promise的不足之处具体有：
1. 无法取消Promise,一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，Promise内部抛出的错误，不会反映到外部
3. 当处于pending状态时，无法得知目前进展到哪一个阶段，是刚刚开始还是即将完成


Promise虽然解决了回调函数的问题，但是它也存在一些未解决的问题，也许在未来我们可以找到更好的方法去解决它。