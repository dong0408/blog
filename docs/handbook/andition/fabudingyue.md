---
title: '面试题: 你会写发布订阅吗？' 
date: 2022-12-08
author: 潘小七
tags:
 - 发布订阅
categories: 
 - andition
isShowComments: true  
subSidebar: auto
---



# 1、 前言

在面试过程中，当面试官问你JS的设计模式的时候，那他大概率会问你最常见、最有名的模式，那就是**发布-订阅**模式了。**发布-订阅模式** （Publish-Subscribe Pattern, pub-sub）又叫 **观察者模式**（Observer Pattern），它定义了一种一对多的关系，让多个订阅者对象同时监听一个发布者，或者叫主题对象，这个主题对象的状态发生变化时就会通知所有订阅自己的订阅者对象，使得它们能够自动更新自己。



# 2、 发布—订阅模式

经过官方的一通解释，可能很多小伙伴还是不明白，什么是发布订阅模式。那这里我就来举一个发布订阅模式的例子吧。


在我们写vue项目的时候，当我们写到子父组件传值的时候，我们有一种解决办法是，在子组件上用绑定 **this.$emit('自定义事件名',要传送的数据)** 事件。 然后在父组件上用 **this. on('事 件 名',call b ack)** callback回调`emit`要传送的数据。 这就是一个很经典的发布订阅的例子。我只有在子组件使用`emit` 发布了一个事件，我们才可以在父组件上用`on`监听的子组件发布事件。而且我们可以利用`on`和`emit`实现事件的多重绑定。

 ## 2.1 具体实现
 
 那现在就有小伙伴问了，那发布订阅该怎么实现呢？ 那下面我就来实现一个发布订阅模式吧。
 
 首先我们要搞明白，写发布订阅模式的几个重要的点：
- 发布者和订阅者应该要在同一个实例对象上。
- 订阅在前， 发布在后
- 发布者，当消息发生时负责通知对应订阅者
- 订阅者，当消息发生时被通知的对象
- emit 函数，用于发布者发布事件
- on 函数， 用于订阅者接收函数
- off 函数， 用于订阅者取消订阅
- once 函数，用于订阅者只接收到一次发布事件

具体实现：
```
class EventEmitter {
    constructor() {
      this.cache = { // 存放订阅事件未执行函数的容器
      }
    }
    on(name, fn) { // 订阅事件
      if (this.cache[name]) { // 多次订阅
        this.cache[name].push(fn)
      } else {
        this.cache[name] = [fn]
      }
    }
    emit(type) { // 发布事件
      if (this.cache[type]) {
        this.cache[type].forEach(item => 
          if (this.cache[type]) {
            item()
          }
        });
      } else {
        this.cache[type] = []
      }
    }
    once(name, fn) { // 一次订阅事件
      const foo = () => {
        fn()
        delete this.cache[name]
      }
      this.on(name, foo)
    }
    off (name, fn) { // 取消订阅事件
      const tasks = this.cache[name]
      if (tasks) {
        const index = tasks.findIndex(item => item === fn)
        if (index >= 0) {
          this.cache[name].splice(index, 1)
        }
      }
    }
  }
```
这样我们就写完了一个发布订阅的模式。那我们就来测试测试。

```
// 公共部分
let ev = new EventEmitter()
let fn = () => {
    console.log('hello 1');
}
   //1. 当未用emit发布事件时， fn函数未执行
  ev.on('hello', fn) //无打印
  // ev.emit('hello')
  
  // 2. 用emit发布事件后
  ev.on('hello', fn) // hello 1
  ev.emit('hello')
 
  // 3. 有多个订阅
  ev.on('hello', () => {
    console.log('hello 1'); // hello 1
  })
  ev.on('hello', () => {
    console.log('hello 2'); // hello 2
  })
  ev.emit('hello')
  
  // 4.取消订阅
   ev.on('hello', fn) // 无打印
   ev.off('hello', fn)
   ev.on('hello', fn) // hello 1
   ev.emit('hello')
  
  // 5. 订阅一次
  ev.once('hello', fn)  // hello 1
  ev.on('hello', fn) // 无打印
  ev.emit('hello')
```
写到这里，我们的发布订阅模式就完成了。

# 结语 

发布订阅模式的实际应用场景还是很多的，掌握这种模式，可以帮我提高我们代码的思想和质量。所以小伙伴们还是需要掌握的哦。