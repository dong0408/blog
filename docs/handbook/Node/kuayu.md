---
title: 最常见解决跨域的三种方式 
date: 2022-09-26
author: 潘小七
tags:
 - 跨域
categories: 
 - Node
isShowComments: true  
subSidebar: auto
---

# 前言
在我们写项目时，我们会经常遇到一个问题就是浏览器的同源策略，它不允许我们向`不同协议号、域名、端口号`发送请求，在后端响应回来的数据时，浏览器接收到时就会被跨域机制拦截下来，同时在前端给我们报`Access to XMLHttpRequest at 'xxx' from origin 'xxx' has been blocked by CORS policy`的错误。这也就是我们称为浏览器跨域了。下面我就来介绍三种常见的解决跨域的三种方式。
## JSONP
首先我们先来介绍介绍JSONP解决跨域的方法，其主要是利用 script 的 src 属性加载资源时不受同源策略的影响这一特性且需要前后端配合。下面来段代码来学会如何使用JSONP来解决跨域。（仅限于GET请求）
```
//前端部分：HTML
<body>  
    <button id="btn"> 获取数据</button>  // 点击按钮发送请求
    <script>
    const jsonp = (url, params, cb) => { //创建JSONP函数
        return new Promise((resolve, reject) => {
            const script = document.createElement('script') // 创建一个script标签 
            params = {...params, cb: cb } //结构出data和cb
            const arr = Object.keys(params).map(key => `${key}=${params[key]}`) //[name='wn',&cb:xxx] //将参数转化成能拼接在url后面的形式
            script.src = `${url}?${arr.join('&')}`  //将参数拼接到http://localhost:3000?name='wn'&cb:xxx上
            document.body.appendChild(script) // 想body上插入script标签
            // 后端会返回一个函数给前端
            //script.src === callback('wn今年18岁')
            // [callback]属性声明分布式应用程序的客户端(window)上存在的静态回调函数
            window[cb] = (data) => {//在windows上执行后端返回的函数
                resolve(data)
            }
        })
    }
    let btn = document.getElementById('btn')
        btn.addEventListener('click', () => { //绑定按钮的点击事件
            jsonp('http://localhost:3000',{name:'wn',age:18},'callback')
            .then(res => { // 接受后端返回
                console.log(res);
            })
        })
    </script>
</body>
```
```
//后端部分：JS
const Koa = require('koa') 
const app = new Koa()
const main = (ctx, next) => {
    console.log(ctx.query);
    const{name ,age, cb} =ctx.query // 解构和接收前端传递的参数
    const userInfo = `${name}今年${age}岁`
    const str = `${cb}(${JSON.stringify(userInfo)})`  //`callback()` 拼接一个函数返回给前端
    console.log(str);
    ctx.body = str
}
app.use(main)
app.listen(3000, () => {
    console.log('项目已启动');
})
```

![P@71HWB2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c5668e32ec46aa9e270932bb9a1ffd~tplv-k3u1fbpfcp-watermark.image?)

![KJ)M)9XSY1_ANO4}3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e65d19ee0c294d77ba694571e732a784~tplv-k3u1fbpfcp-watermark.image?)


`通过JSONP利用src属性不受同源策略的影响，我们直接在前端创建一个scrpit标签，通过srcpit中的src属性向后端发送请求，让我们前端可以拿到后端返回的数据，解决了前端跨域问题。`


## Cors

在介绍完JSONP方法后，我们再来看一种更简单的Cors解决跨域的方法。cors方法需要我们在后端环境下安装，且需要后端开启，同时只能在开发环境下使用,下面我们来段代码介绍一下Cors方法。
```
//前端部分：HTML
<body>  
    <!-- <img src="xxxx" alt=""> -->
    <button id="btn"> 获取数据</button>

    <!-- <script src="xxxx.js?callback"></script> -->
    <script>
        let btn = document.getElementById('btn')
        btn.addEventListener('click', () => {
            $.ajax({
                url:'http://localhost:3000',
                data:{
                    name:'wn'
                },
                headers: {  //为了告诉后端，你返回的响应头的类型应该是xxx
                    "Content-Type":'application/json;charset=utf-8'
                    // accept:'application/json;charset=utf-8'
                },
                method:'get',
                success(res) {
                    console.log(res);
                }
            })
        })
    </script>
</body>

```

```
//后端部分：JS
const Koa = require('koa')
const cors = require('@koa/cors');
const app = new Koa()
app.use(cors()); //后端开启cors，允许跨域操作
const main = (ctx, next) => {
    console.log(ctx.query.name);
    ctx.body = 'hello world'
}
app.use(main)
app.listen(3000, () => {
    console.log('Cors项目已启动');
})

```
我们仅需在前端用ajax发送请求，后端安装一个cors方法，然后再后端开启cors即实现如上图一样的效果，解决前端跨域问题。但是cros只能在开发环境下使用，因为一旦开始cros方法后，浏览器的同源策略就失效了。

那我们就好奇了，这个cors的源码到底是怎么写的呢？ 我们是否可以限制他的白名单呢？下面我们就来一段代码，看看cors的实现原理吧。
```
const http = require('http')
const server = http.createServer((req, res) => {
    // 开启 Cors ,后端在响应头中设置
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500", //白名单
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS", //请求的方法
        //不管浏览器返货什么类型都可以
        "Access-Control-Allow-Headers": "Content-Type" // 请求头
    })
    res.end('hello cors') // 返回数据
})
server.listen(3000, () => { 
    console.log('Cors项目已启动');
})
```
## Node代理

在介绍完上面这两种方法后，我们再来一种我们在vue项目中用的最多的Node代理的方法吧。**Node代理实现跨域的原理为，在我们的vue项目向直接自己开一个符合同源策略的后端，我们在使用我们的后端将跨域的后端数据拿到我们自己开的后端上，再让前端直接请求我们的后端。** 这样就实现了Node代理。下面我们来一段代码来实现一下Node代理的方法。
```
//前端代码：HTML
<body>  
    <button id="btn"> 获取数据</button> 
    <script>
        let btn = document.getElementById('btn')
        btn.addEventListener('click', () => { 
            $.ajax({ // 正常发送请求
                url:'http://localhost:3001',
                data:{
                    name:'wn'
                }
                method:'get',
                success(res) {
                    console.log(res);
                }
            })
        })
    </script>
</body>
```
```
// 自己开的后端
const http = require('http')
const server = http.createServer((req, res) => {
    // 开启 Cors ,后端在响应头中设置
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500", //白名单
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        //不管浏览器返货什么类型都可以
        "Access-Control-Allow-Headers": "Content-Type"
    })
    // 向别人的后端请求数据
    const proxyReq = http.request({
        host:'127.0.0.1',
        port:'3000',
        path:'/',
        method:'GET'
    }, 
    proxyRes => {
        // console.log(proxyRes); //事件参数
        proxyRes.on('data', result => {
            // console.log(result.toString());
            res.end(result.toString())
        })
    }).end()//终止
})
server.listen(3001, () => {
    console.log('node项目已启动');
})
```
```
//需要请求的后端
const Koa = require('koa')
const app = new Koa()
const main = (ctx, next) => {
    ctx.body = 'hello world'
}
app.use(main)
app.listen(3000, () => {
    console.log('项目已启动');
})
```
# 总结
解决跨域的方式还有许多种，这里我也就介绍了比较常见的三种，欢迎大神补充更方便快捷的解决跨域的方法。
