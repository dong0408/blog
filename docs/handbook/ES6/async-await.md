---
title: ES6——promise对象  
date: 2022-07-28
author: 潘小七
tags:
 - ES6
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---

## 前言
关于异步处理问题，ES5的回调让我们陷入回调地狱轮回，后来ES6诞生了`Promise`（[Promise不了解？点这了解](https://juejin.cn/post/7122431169710260237)）让我们脱离轮回，终于，在ES7更新出`async-await`让我们更优雅的处理回调问题。今天我们就来解析解析 `async-await`和`Promise`有何联系和区别。

## asnyc-await
async 函数是使用`async`关键字声明的函数。 async 函数是[`AsyncFunction`]构造函数的实例， 并且其中允许使用`await`关键字。`async`和`await`关键字让我们可以用一种更简洁的方式写出基于[`Promise`]的异步行为，而无需刻意地链式调用`promise`。

### asnyc
**async**关键字用于声明异步函数，它可以在函数声明、函数表达式还有箭头函数中使用,方法如下：

```
 1.   async function Async(){}
    
 2.   let Async = async function(){}
    
 3.   let Async = async ()=>{}
```
在这我们要注意是`await` 不能够单独出现，其函数前面一定要有 `async` ,所以在我们使用时 `async` 和 `await` 要结合起来一起使用才有意义。

### await

当我们使用**async** 声明了一个异步函数，那么我们就可以在这个异步函数内部使用`await`关键字。下面我就用几段代码来理解`async-await`的用法和`promise`的不同。

我们先来看看`asnyc-await`怎么用吧！
```
function getJSON(){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
        console.log('JSON');
        resolve('ok');
    },500)
    })
 }
 async function testAsync(){
    await getJSON();  
    console.log('数据拿到了');
 }
testAsync()
```

![微信图片_20220728210537.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c10cb5e0c70742c791f41c9bfa2c690e~tplv-k3u1fbpfcp-watermark.image?)
在上面这段代码中，我们显然可以看出这是一段异步代码，但是这里我们没有用 `promise.then` 或者回调来解决，我们用的是`async-await`来解决，下面我来解析解析`async-await`的用法：首先我们要在在函数`testAsync`前添加`async`，接下来我们用异步代码的调用前添加`await`，这样的话`testAsync`函数下面的代码等待异步代码先执行。这就是`asnyc-await`解决异步回调问题的用法。

既然我们已经知道了`async-await`的用法下面我们再来一段代码，来给`promise`和`asnyc-await`两种方法做个比较：
```
function getJSON() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve(2)
        }, 2000);
    })
 function testAsync() {
     return Promise.resolve(2).then(() =>{
         getJSON()
     })
     .then(() =>{
        console.log(3);
     })
}
testAsync()

 //相当于
 
function getJSON() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(2);
            resolve(2)
        }, 2000);
    })
}
async function testAsync() {
    await getJSON()
     console.log(3);
}
testAsync()
```

![微信图片_20220728211658.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d496dac9d048494586fb511452e186a0~tplv-k3u1fbpfcp-watermark.image?)
在上面这段中，我们就可以看出，我们使用 `await` ，解释器都创建了一个 `Promise` 对象，把剩下的`async`函数中的操作都放到 `then` 回调函数中。`async/await` 的实现，离不开 `Promise` 。从字面意思来理解 `async` 是“异步”的简写， `await` 是 `async await` 的简写，可以理解为等待异步执行结束之后再执行。

既然我们看清了`async-await`和`promise`的区别,那下面我们就来聊聊`async-await`的执行顺序:

```
console.log('start');
async function async1() {
    await async2() // 新款浏览器为 await 开辟了特别通道，执行提前了
    console.log('async1 end'); // 来到了当前这一次事件循环的微任务序列
}

async function async2() {
    console.log('async2 end');
}
async1()
setTimeout(() => {
    console.log('setTimeout');
}, 0)
new Promise(resolve => {
    console.log('Promise');
    resolve()
})
    .then(() => {
        console.log('promise1');
    })
    .then(() => {
        console.log('promise2');
    })
console.log('end');
```

![微信图片_20220728212300.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8b3c3f7b8a44e0593a94dc97972304f~tplv-k3u1fbpfcp-watermark.image?)

我们来分析这段代码的打印顺序，首先我们会打印同步代码，所以打印出`start`，然后我们就好奇了为什么下面一个打印的不是`Promise`而是`async2 end`, 明明`async2`是异步代码，为啥会先打印呢？这是因为浏览器为 `await` 开辟了特别通道，执行提前了。所以第二个打印的就是`async2 end` （可以理解为吧async看成同步代码）之后也就自然打印Promise，end等同步代码，接下来就要执行异步代码了，也就依次打印出了`async1 end` 、`promise` 、`promise2` ，最后打印`setTimeout`。

## 结语

这就是我对`async-await`的解析，我们不难看出，ES7更新出`async-await`就是简化了`promise`的写法，将异步回调的处理变得更加简便。