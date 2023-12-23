---
title: 简洁明了的循环写法 for in-of 
date: 2022-07-31
author: 穷小白
tags:
 - ES6
categories: 
 - ES6
isShowComments: true  
subSidebar: auto
---
# 前言

在我们写`JavaScript`中的循环时，我们是不是只会用for和`while`？这时我就会想,有没有更优雅的写法可以发挥同样的作用呢？那今天我就来介绍两种不一样的循环写法吧！来分析分析 `for of` 、`for in` 与 `for`、`while` 的区别吧！

在介绍这这两个循环前，我先来介绍一个概念吧：

## Iterator（遍历器）

`Iterator`是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

`Iterator` 的作用有三个：一是为各种数据结构（`Objiect`、`Array`、`Set`、`Map`...），提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`（`for...in`）循环，`Iterator` 接口主要供`for...of`(`for...in`)使用。

原生具备 Iterator 接口的数据结构如下所示：

-   Array
-   Map
-   Set
-   String
-   TypedArray
-   函数的 arguments 对象
-   NodeList 对象


## for in

语法：`for(let/const/var index in object){...}`

`index`：在每次迭代时，`index`会被赋值为不同的属性名；`object`：非 `Symbo` 类型的可枚举属性被迭代的对象。

### 使用场景：

1.遍历对象

`for in`在遍历对象时，原型上的属性也会被遍历下来，`for in`中的`i`表示的是对象的`key`，如果我们想遍历对象的值得时候，我们需要搭对象名来使用。
```
  const obj = {
    a: 1,
    b: 2,
    c: 3
}
Object.prototype.d = 4
for(let i in obj ) {
    console.log(i);
}
    // a b c d

for(let i in obj ) {
    console.log(obj[i]);
}
    // 1 2 3 4 
  ```
  
2.遍历数组/字符串

 `for in` 在遍历数组和字符串时，与遍历对象相同， 原型上的也属性也会被遍历下来，遍历的是数组或字符串的下标，如果想获得数组或字符串的值得话，也要带上数组或字符串名。
    
```
Array.prototype.c = 'c'

const arr = [1, 2, 3, 4]
for(let i in arr ) {
    console.log(i);
}
    // 0 1 2 3 c
    for(let i in arr ) {
    console.log(arr[i]);
}
    // 1 2 3 4 c
const str = 'abc'
for(let i in str) {
    console.log(i)
}
    // 0 1 2
for(let i in str) {
    console.log(str[i])
} 
    //  a b c
```

## for of

语法：`for(let/const/var value of object){...}`

`value`：在每次迭代中，将不同属性的值分配给变量。；`object`：被迭代枚举其属性的对象。

### 使用场景

1.遍历对象

`for of`不能遍历对象，因为对象没有`iterable`（遍历器）属性。
```
const obj = {
    a: 1,
    b: 2,
    c: 3
}
Object.prototype.d = 4
for (let i of obj) {
    console.log(i);
}

//  TypeError: obj is not iterable
```

2.遍历数组/字符串

 `for of` 在遍历数组和字符串时， 原型上的属性是不会被遍历下来，`i` 代表的数组或字符串。
   

```
Array.prototype.c = 'c'

const arr = [1, 2, 3, 4]
for(let i of arr ) {
    console.log(i);
}

    // 1 2 3 4 
const str = 'abc'
for(let i of str) {
    console.log(i)
}
    //   a b c

```
3.遍历Set/Map数据结构

`for of` 在遍历`Set`时，与遍历数组方法相同，但在遍历`Map`，只能将键和值一起遍历下来，如果指向遍历键或者得话，`i`要写成数组的形式。
```
const s = new Set([1, 2, 3, 4])
for(let i of s ) {
    console.log(i);
}
    // 1 2 3 4
    

const myMap=new Map();
myMap.set('1', '2');
myMap.set('3', '4');
for(let i of myMap) {
    console.log(i);
}

    //  [ '1', '2' ]  [ '3', '4' ]
for (let [key, value] of myMap) {
    console.log(key + value);

}
    // 12 34
```


## 区别
1.使用 `for in` 遍历，遍历的都是数据结构的下标（`index`）或者键（`key`），使用 `for of` 遍历 遍历则是数据结构的值（`value`）。

2.`for in` 可以遍历所有的数据结构，但是`for of`只能遍历具有`Iterator`属性的数据结构，所以相对于`for in`，`for of`更加适用遍历数、数组对象、字符串、Map、Set等拥有迭代器对象的集合，也于for循环更相似，使用起来也更方便。

3.`for in`会遍历到数据结构自身的和原型上的可枚举的属性和方法，但是`for of` 只会遍历数据结构自身的值。

4.`for in`遍历对象得到的属性值顺序与和原对象的属性值顺序不相同，因为`ECMAScript` 规范中定义了数字属性应该按照索引值大小升序排列，字符串属性根据创建时的顺序升序排列。

# 结语

`for`、 `while`、`for in`、 `for of`这四种不同的方法，在不同的场景都各有千秋，只有我们灵活的掌握这些不同的方法，我们才可以更加合理的利用这些方法，才能使我们的代码更优雅。

