---
title: 解析JS中的类型转换 
date: 2022-08-29
author: 穷小白
tags:
 - 类型转换
categories: 
 - JavaScript
isShowComments: true  
subSidebar: auto
---

# 前言
由于 JS 是一门**弱类型**或者说是**动态语言**。变量没有类型限制，可以随时赋予任意值。所以在 JS 定义的数据类型是不确定的，但是但是各种运算符对数据类型是有要求的。如果运算符发现，运算值的类型与预期不符，就会自动进行转换类型。

# 原始类型之间的转换
在ES5中定义的只要原始类型主要有‘字符串（String）’，‘数字（Number）’，‘布尔值（Boolean）’，undifined和Null，其中类型转换主要有原始类型转布尔，数字，字符串三种。
```
let str = 'hello'
let num = 0
let bool = false
let un = undefined
let nu = null

//原始值转布尔
console.log(Boolean(str));  // false
console.log(Boolean(num)); // 0 false   其他为 ture
console.log(Boolean(bool));  //false
console.log(Boolean(un));   //false
console.log(Boolean(nu));  //fasle
console.log(Boolean(NaN));  //fasle


//原始值转数字
console.log(Number()); // 0
console.log(Number(str)); // NaN   
console.log(Number(bool)); // 0
console.log(Number(undefined)); // NaN
console.log(Number(nu)); // 0


//原始值转字符串
console.log(String(num)); // -1
console.log(String(bool)); // false
console.log(String(un)); // undefined
console.log(String(NaN)); // NaN
console.log(String(Infinity)); // Infinity
```


## 原始类型转对象
原始类型得转换不仅仅停留在原始值之间的转换，还有原始类型和对象之间的转换。


```
//原始值转对象

// String()  Number()  Boolean()

let a = 1  || '1' true
console.log(typeof a);  // number
let b = new Number(a)
console.log(typeof b);  // object
```
## 对象转原始类型
既然存在原始类型转对象，那就必然也有对象转原始类型。
```
// 对象转原始类型

//对象转布尔
console.log(Boolean([]));  //所有引用类型转对象都为 true

//对象转数字和字符串

// toString() valueOf()  对象转字符串和数字的方法

Object.prototype.toString.call({a: 1})  // '[object Object]'

let  s = new String('hello') //用String去new一个字符串 
console.log(s);  //打印出String {'hello'} 对象

let obj = {"a": 1}
let a = JSON.stringify(obj) //对象转字符串
JSON.parse(a)  // 字符串转对象
```

对象转原始类型一定会调用ToPrimitive(obj,Number/String)方法，
ToPrimitive(input,PreferredType),
PreferredType不存在时，默认为String，input是Date类型，相当于PreferredType==String

ToPrimitive(obj, Number)
1.  如果obj是基本类型，直接返回
2.  否则，调用valueOf（取原始值） 方法，如果得到一个原始类型，则返回
3.  否则，调用toString 方法，如果得到一个原始类型，则返回
4.  否则报错
 
ToPrimitive(obj, String)
1.  如果obj是基本类型，直接返回
2.  否则，调用toString 方法，如果得到一个原始类型，则返回
3.  否则，调用valueOf 方法，如果得到一个原始类型，则返回
4.  否则报错

```
String({name:'duck'})  //'[object Object]' 
//执行过程

//({name:'duck'}).toString()//'[object Object]' 
//String('[object Object]')=>'[object Object]'


Number({})//NaN 
//执行过程

//({}).valueOf()//{}
//({}).toString()//'[object Object]'
//Number('[object Object]')=>NaN 

Number([])//0

```
## 隐式类型转换

### 一元运算符
v1

当 - 运算作为一元操作符时，会调用ToNumber()处理该值（非Number类型的值），转不了的变为NaN

当 + 运算作为一元操作符时，会调用ToNumber()处理该值（非Number类型的值）,转不了的变为NaN


```
1 + '1' //'11'  
[] == ![] // ture  ![] == false == 0
[] == [] // false  数组的引用地址不一样
[] + [] // ''
[] + {} // '[object Object]'
{} + [] // 0  == + []
```

### 二元操作符


v1 + v2 (都往数字身上转，遇到字符串转字符串)

1.  lprim = Toprimitive(v1)
2.  rprim = Toprimitive(v2)
3.  如果lprim 或者 rprim 是字符串 那么返回 ToString（lprim） 和 ToString（rprim）的拼接结果
4.  返回ToNumber（lprim） 和 ToNumber（rprim） 的相加结果


```
 1 + '1' //'11'
 null + 1  // 1
 [] + []  // ''
 [] + {} // '[object Object]'
{} + [] // 0  == {  }//代码块   + []
({} + []) // '[object Object]'
{} + {} // '[object Object][object Object]'

```

### 二元运算符

#### 如果x和y是同一类型：

1.x是undefined,返回true

2.x是null,返回true

3.x是数字，x为NaN,返回false

4.x和y指向同一个对象（内存地址），返回true,否则返回false
```
let x={};
let y=x;
x==y // true

{}=={} // false

[]==[] // false

undifined == undifined // true

null == null  // true
 
1 == NaN  // false

NaN == NaN  // false
```
#### 如果x和y不是同一类型

1.null==undefined =>true

2.x是String类型，ToNumber(x)

3.x是Boolean类型,ToNumber(x)

4.x不是String/Number,y是Object true=={a:123} //false

```
null == undifined // true

'1' == 1 // ture

ture == '1' // ture
 
ture == 1 // ture
 
ture == {} // flase

false == {} //flase


```
