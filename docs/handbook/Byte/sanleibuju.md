---
title: CSS经典三列布局—圣杯布局与双飞翼布局 
date: 2022-07-10
author: 穷小白
tags:
 - CSS
categories: 
 - Byte
isShowComments: true  
subSidebar: auto
---


##  前言
在我们浏览页面时，我们经常左中右的三列的CSS布局，这就是CSS经典了圣杯布局和双飞翼布局，左边右两边固定，中间自适应。效果如下图，接下来我就和大家来探讨一下圣杯布局和双飞翼布局的异同。

![屏幕截图(72).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d010fd5023794e809569cf8f6b2752ed~tplv-k3u1fbpfcp-watermark.image?)

## 圣杯布局代码解析
首先我先给展示一下大家圣杯布局的实现

-   第一步给最外层容器wrap设置左右的`padding`为`200px`
-   第二步我们来渲染 `content`、`letf`、`right`三个容器。给`content`加上`widthL:100%`,让他撑满容器，`background: green;`，`height:200px;`方便看效果。同时给把 `left`和`right`宽度和高度都设置为`200px`。然后将三个盒子都设置为浮动，也就是`wrap`下的`div`都设为`float:left`。
接下我我们看一看下效果：


![屏幕截图(73).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7be367fd960e45148111fe2a574f55c5~tplv-k3u1fbpfcp-watermark.image?)
到这一步，我们要做的就是把下面两个容器移到上面两个空白区域上就可以实现我们要的渲染效果了。那我们就要给左右`left`,`right`容器再加一个相对定位属性将它们移上去。
-   第一步：我们先移`left`容器，给`left`容器加上`position: relative;`、 `left: -200px;`、`margin-left: -100%;`。先将`left`容器拉回第一行，再相对于`content`容器向左移100%（也就是`content`自身的宽度），在让`left`先相对自身向右移200像素。
-    第二步：我们移`right`容器，给`right`容器加上`margin-left: -200px;`、`position: relative;`、`left: 200px;`，同理将`rihgt`加上`position: relative;`、` left: 200px;`将right现对于自身的位置向左移200px。
经过这两步，我们就可以就达和效果图一样的效果。这也就所谓的圣杯布局了。

## HTML代码
```
<body>
    <div class="wrap">
        <div class="content">
            content
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
    
</body>
```
## CSS代码
```
*{
        margin: 0px;
        padding: 0px;
    }
    .content{
        width: 100%;
        background: green;
        height: 200px;
    }
    .left, .right{
        height: 200px;
        width: 200px;
        background: pink;
    }
    .wrap div{
        float: left;
    }
    .wrap{
        padding: 0 200px;
        height: 2000px;
    }
    .left{
    margin-left: -100%;
        position: relative;
        left: -200px;
       
    }
    .right{
        margin-left: -200px;
        position: relative;
        left: 200px;
    }
  ```
## 双飞翼布局代码解析
接下来我来给展示一下大家双飞翼布局的实现
-  第一步和圣杯布局一样，我们将`content`容器、`left`容器、`right`容器都设置为`float:left`向左浮动,并且设置`left`和`right`的高度和宽度都为`200px`，设置`content`的宽度为`100%`，高度也为`200px`，更方便看效果。
-   第二步设置`left`的`margin-left:-100%`,使其覆盖在`content`上的最左侧

-   第三步然后设置`right`的`margin-left：-200px`，使其覆盖在`content`的右侧；
我们再来看看效果：

![屏幕截图(74).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2b58f94b744001adb92d808f60e108~tplv-k3u1fbpfcp-watermark.image?)
我门可以看出虽然左右的`left`、`right`容器虽然到了指定的位置，但是我们`content`容器的内容也被两边的容器遮住。达不到我们想要的效果
-   所以最后一步，我们在`content`容器中再套一层`inner`容器，让主要内容在`inner`加载出来，所以我们需要设置`inner`的`margin`左右为`200px`，这样就达到和效果图一样的效果了，这也就是双飞翼布局了。

## HTML代码
```
<body>
    <div class="wrap">
        <div class="content">
            <div class="ineer">content</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
```
## CSS代码
```
<style>
        *{
            margin: 0;padding: 0;
        }
        .left, .right{
            width: 200px;
            height: 200px;
            background:  pink;
            float: left;
        }
        .content{
            height: 200px;
            background: rgb(45, 173, 75);
            float: left;
            width: 100%;
        }
        .ineer{
            margin: 0 200px;
            height: 200px;
        }
        .left{
            margin-left: -100%;
        }
        .right{
            margin-left: -200px;
        }
    </style>
 ```
 ## 异同
 
 下面我们介绍这两种布局的异同。
 - 同：两种布局都将将盒子设置为右浮动，同时在HTML中盒子加载的顺序都是中左右，给定中间容器100%的宽度让其可以随着页面宽度的变化而变化。然后再用左边距将左右容器覆盖在中间容器上。
 - 异：当将三个容器拉到同一行时，圣杯布局是调整左右容器的位置，用相对定位的方式将左右容器移出中间容器，同时再给最外层容器一个内边距，防止覆盖中间容器。双飞翼布局是给中间容器再套一层内层容器，将内容在内层容器中显示，而不是在中间容器中。再给内层一个内边距，使内容不会被左右容器遮挡。
## 小结
圣杯布局和双飞翼布局实现的效果都是相同的，只是在左右容器覆盖在中间容器中时，处理的容器不同而已。圣杯布局在处理左右容器，用相对定位时要注意左右平移的方向是相反的。双飞翼布局处理中间容器时要注意内层容器的内边距。