---
title: 在写vue的项目中为什么index不能做key使用？ 
date: 2022-09-25
author: 潘小七
tags:
 - vue
categories: 
 - Vue
isShowComments: true  
subSidebar: auto
---

# 前言
在我们写vue的的项目时，我们是否会疑惑后端数据为什么都会带一个Id，而这个Id一般都作为循环中的key来使用，我们为什么不直接用index来作为他的key呢？这样不是更方便吗？下面我就带大家解决解决这和疑惑吧。

### key的作用
在解决这个疑惑之前，我们先来了解了解key在循环中的作用吧。

1、key是唯一标识，它作用主要是为了更高效的让`diff算法`更准确的找到需要被对比的两个结点。

2、Vue在patch过程中判断两个节点是否是相同节点key是必要条件，渲染一组列表时，key是作为唯一标识，所以如果不定义key的话，Vue只能认为比较的两个节点是同一个，导致了频繁更新元素，使得整个patch（diff算法）过程比较低效，影响性能。

3、在实际的使用中在渲染一组列表时key必须设置，而且必须是唯一标识（所以不能用随机数做key），应该避免使用index作为key，因为会导致一些隐蔽的bug；Vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让Vue可以区分它们，否则Vue只会替换其内部属性而不会触发过渡效果。

### 虚拟DOM树
简单来说，虚拟DOM树就是一个对象而已， 其中描述了每一层容器的特征。

其主要是利用 js 描述元素与元素的关系，用 js 对象去表示真实的 DOM 树结构，创建一个虚拟 DOM 对象
以便内在浏览器中操作数据的改变。


vue在组件渲染的时候会在生命周期中调用 render 函数，这个函数也会生成一个虚拟 dom，再根据这个虚拟 dom 生成真实的 dom，然后这个真实的 dom 会挂载到页面中。

如果组件内有响应的数据，数据发生改变的时候 render 函数会生成一个新的虚拟 dom， 新的虚拟 dom 树会去使用diff算法去和旧的虚拟 dom 树进行对比，找到要要修改的虚拟 dom 的部分，去修改相对应部分的真实 dom，在将真实dom挂载到页面中。


### diff算法

1.diff算法diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录的消息去局部更新Dom。


2.diff算法就是用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到页面中。

3.当中当状态变更的时候，diff算法又会重新执行，构造一棵新的虚拟DOM树结构。然后用新的树和旧的树进行比较，记录两棵树差异，同时把新的DOM树所记录的差异应用到旧的DOM树中，然后再构建的真正的DOM树上，实现了视图的更新

## index不能作为key的两种demo情况

### deom1

```
<body>
    <div id="app">
        <ul>
            <item v-for="(num, index) in list" :key="num.id" || :key ='id'
            :num="num.num" :class="`item${num.num}`"></item>
        </ul>
        <button @click="change">change</button>
    </div>
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    list: [
                        {id:1, num:1},
                        {id:2, num:2},
                        {id:3, num:3},
                    ]
                }
            },
            methods: {
                change(){
                    this.list.reverse()
                }
            },
            components: {
                item: {
                    props:['num'],
                    template:`
                    <div>
                        {{
                        num
                        }}
                    </div>
                },
                name:'child'
            }
        })
    </script>
</body>

```
我们先来说说demo1，我们来看看用index和id做key值其内部的虚拟DOM结构发生的变化。

![屏幕截图(92).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a79ee561bb774fe392a83c368984d220~tplv-k3u1fbpfcp-watermark.image?)
在这两种DOM树的比较中，我们可以看到用index作为key值时，在列表倒装时，其生成的新的DOM树结构发生了改变，这就导致了diff有要重新去执行一遍，导致性能的浪费。而用id作为key值时，生成的DOM树结构没有发生变化。

**所以用index作为key会导致diff 中的优化失效（降低了复用性，违背了虚拟DOM的初衷）**
### demo2
```
<body>
  <div id="app">
    <ul>
      <li v-for="(num, index) in list" :key="index">
        <item/>
      </li>
    </ul>
    <button @click="del">del</button>
  </div>
  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          list: [ 1, 2, 3]
        }
      },
      methods: {
        del() {
          this.list.splice(0, 1)
        }
      },
      components: {
        item: {
          template: '<div>{{Math.random()}}</div>'
        }
      }
    })
  </script>
</body>
```
在deom2中，当我们要删除列表的第一和值时，如果使用index作为key，会产生严重的bug，同样的，我们先来分析分析他的dom结构。

![屏幕截图(93).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/affc3fc304cf4146a26c4abe36a55f5f~tplv-k3u1fbpfcp-watermark.image?)

在我们使用index作为key时，当我们要删除列表的第一个值时，第二个值的key就会向前进一位，而diff算法删除生成的新的DOM树会识别到列表的长度缩短了一位，而直接生成前两两个值的DOM树结构，从而删除了最后一位DOM结点，导致出现bug。而当我们使用id作为key是，diff算法会直接删除对象的key的结点。

**所以在删除数据时，因为vue 不会深入的去对比子组件的文本内容，所以会错误移出VDOM中的结点。**

# 总结
介绍完这两种情形下，在我们平常的conding中，为了使我们能按时下班，我们也应该拒绝用index作为key来使用。