
title: Android关于Scroller的基本使用
date: 2015-5-10 14:04:00
categories: 
    - Android
tags: 
    - Scroller 
---


#### Scroller的基本用法

`Scroller`是一个专门用于处理滚动效果的工具类，这个类封装了滚动操作。滚动的持续时间可以通过构造函数传递，并且可以指定滚动动作的持续的最长时间。经过这段时间，滚动会自动定位到最终位置，并且通过`computeScrollOffset()`会得到的返回值为false，表明滚动动作已经结束。很多大家所熟知的控件在内部都是使用Scroller来实现的，如ViewPager、ListView等。

<!-- more -->

* android.widget.[Scroller](https://developer.android.com/reference/android/widget/Scroller.html)
* android.widget.[OverScroller](https://developer.android.com/reference/android/widget/OverScroller.html) 带over效果
* android.support.v4.widget.[ScrollerCompat](https://developer.android.com/reference/android/support/v4/widget/ScrollerCompat.html) 整合了上面两个

本文以android.widget.Scroller为例，其余两种使用方法差不多。

```
public class ScrollerDemoView extends LinearLayout {

    private Scroller mScroller;

    public ScrollerDemoView(Context context) {
        this(context, null);
    }

    public ScrollerDemoView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ScrollerDemoView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        //初始化Scroller并设置一个插值器
        mScroller = new Scroller(context, new BounceInterpolator());
    }

    @Override
    public void computeScroll() {
        //判断是否完成滚动
        if (mScroller.computeScrollOffset()) {
            scrollTo(mScroller.getCurrX(), mScroller.getCurrY());
            postInvalidate();
        }
        super.computeScroll();
    }

    //调用该方法开始滚动
    public void startScroller() {
        mScroller.startScroll(getScrollX(), getScrollY(), getScrollX() - 100, getScrollY() - 100);

        invalidate();
    }

}
```

从上面的代码使用上可以看出`Scroller`就是提供了一个计算滚动位置的工具，位置值的变化与我们设置的 **持续时间** 以及 **插值器** 有关，我们可以在`computeScroll()`方法中通`getCurrX()`和`getCurrY()`获取当前的坐标值，最终还是通过`scrollTo()`方法实现内容的滚动。

#### 相关方法

* `getCurrX()` //获取mScroller当前水平滚动的位置
* `getCurrY()` //获取mScroller当前竖直滚动的位置
* `getFinalX()` //获取mScroller最终停止的水平位置
* `getFinalY()` //获取mScroller最终停止的竖直位置
* `setFinalX(int newX)` //设置mScroller最终停留的水平位置，没有动画效果，直接跳到目标位置
* `setFinalY(int newY)` //设置mScroller最终停留的竖直位置，没有动画效果，直接跳到目标位置
* `startScroll(int startX, int startY, int dx, int dy)` //滚动，startX, startY为开始滚动的位置，dx,dy为滚动的偏移量, duration为完成滚动的时间 ，使用默认完成时间250ms
* `startScroll(int startX, int startY, int dx, int dy, int duration)`
* `computeScrollOffset()` //返回值为boolean，true说明滚动尚未完成，false说明滚动已经完成。这是一个很重要的方法，通常放在View.computeScroll()中，用来判断是否滚动是否结束。