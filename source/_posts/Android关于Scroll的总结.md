
title: Android关于Scroll的总结
date: 2015-8-10 15:04:00
categories: 
    - Android
tags: 
    - Scroll 
---

### 实现滑动的方法

触摸`View`时，系统记下当前触摸点坐标；当手指移动时，系统记下移动后的触摸点坐标，从而获取到相对于前一次坐标点的偏移量，并通过偏移量修改`View`的坐标。如此重复，从而实现滑动的过程。

<!-- more -->

 **Android 坐标系和视图坐标系的区别**

* Android坐标系：左上角作为原点，由 `getLocationScreen(int location[])` 获取点的位置，或在触控事件中使用 `getRawX()`、`getRawY()`获得Android 坐标系中的坐标。
* 视图坐标系：子视图在父视图中的位置关系，同样，父视图的左上角为坐标原点，通过 `getX()`、`getY()` 获得视图坐标系的坐标。

View 提供的获取坐标方法`getTop()`、`getLeft()`、`getRight()` 和 `getBottiom()` 获取到的是 `View` 自身的顶边、左边、右边、底边到其父布局顶边、左边、右边、底边的距离。

**MotionEvent 提供的方法**

* `getX()`, `getY()` 获取到点击事件距离控件左边、顶边的距离，即视图坐标
* `getRawX()`, `getRawY()` 获取点击事件距离整个屏幕左边、顶边的距离，即绝对坐标

#### 使用scrollTo()或scrollBy()方法

* `scrollTo(x, y)` 移动到一个具体的坐标点
* `scrollBy(dx, dy)` 移动的增量为 dx, dy

`scrollTo` 和 `scrollBy` 移动的是 `View` 的内容。即：对 `TextView` 使用的话，则是移动它的文本；对 `ViewGroup` 使用的话，则移动的是所有的子 `View`。

#### 使用layout()方法

    //在当前 left, top, right, bottom 的基础上加上偏移量
    layout(getLeft() + offsetX, getTop() + offsetY, getRight() + offsetX, getBottom() + offsetY);

#### 使用offsetLeftAndRight()或offsetTopAndBottom()方法

与 `layout` 方法 效果相同，只是多了一层封装而已

    //同时对 left 和 right 进行偏移
    offsetLeftAndRight(offsetX);
    //同时对 top 和 bottom 进行偏移
    offsetTopAndBottom(offsetY);

#### 使用LayoutParams

`LayoutParams` 保存了一个 `View` 的布局参数，所以通过改变 `LayoutParams` 来动态修改一个布局的位置参数，从而达到改变 `View` 位置的效果。

    LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams)getLayoutParams();
    layoutParams.leftMargin = getLeft() + offsetX;
    layoutParams.topMargin = getTop() + offsetY;
    setLayoutParams(layoutParams);

所以，其实我们改变的是这个 View 的 Margin 属性

#### 使用动画

使用补间动画或属性动画实现view的滑动

#### 使用Scroller

[Android关于Scroller的基本使用](http://zhangqiyang.ren/2015/05/10/Android%E5%85%B3%E4%BA%8EScroller%E7%9A%84%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/)

#### 使用ViewDragHelper

[Android ViewDragHelper完全解析](http://blog.csdn.net/lmj623565791/article/details/46858663)

[Android ViewDragHelper源码解析](http://www.cnblogs.com/lqstayreal/archive/2015/05/13/4500219.html)
