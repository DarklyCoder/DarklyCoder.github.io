title: Android基础知识汇总
date: 2016-5-1 16:04:00
update: 2016-6-28 16:04:00
categories: 
    - Android
tags: 
    - Android 
    - 基础知识
---

搜罗网上有关Android的知识介绍，汇聚一起方便查阅。

<!-- more -->

### Activity

#### Activity的生命周期

* [启动与销毁Activity](http://hukai.me/android-training-managing-the-activity-lifecycle-lesson-1/)
* [暂停与恢复activity](http://hukai.me/android-training-managing-the-activity-lifecycle-lesson-2/)
* [停止与重启activity](http://hukai.me/android-training-managing-the-activity-lifecycle-lesson-3/)
* [重新创建销毁的activity](http://hukai.me/android-training-managing-the-activity-lifecycle-lesson-4/)
* [InstanceState详解](http://www.cnblogs.com/hanyonglu/archive/2012/03/28/2420515.html)

#### Activity启动模式

* [Activity四种启动模式图文详解](http://jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0520/2897.html)
* [Activity四种启动模式和taskAffinity属性详解](http://blog.csdn.net/zhangjg_blog/article/details/10923643)

#### Activity的启动过程

* [Android应用程序启动过程源代码分析](http://blog.csdn.net/luoshengyang/article/details/6689748)
* [Android应用程序内部启动Activity过程（startActivity）的源代码分析](http://blog.csdn.net/luoshengyang/article/details/6703247)
* [Android应用程序在新的进程中启动新的Activity的方法和过程分析](http://blog.csdn.net/luoshengyang/article/details/6720261)

#### Activity的回收过程及原理

### Broadcast

#### 广播的分类及区别,注册方法

* [解析BroadcastReceiver之你需要了解的一些东东](http://www.cnblogs.com/net168/p/3980068.html)

#### 广播实现跨进程通信的原理

* [Android应用程序注册广播接收器（registerReceiver）的过程分析](http://blog.csdn.net/luoshengyang/article/details/6737352)
* [Android应用程序发送广播（sendBroadcast）的过程分析](http://blog.csdn.net/luoshengyang/article/details/6744448)

### Service

#### 绑定和非绑定Service的使用方法

* [Android中bindService的使用及Service生命周期](http://blog.csdn.net/iispring/article/details/48169339)
* [Android通过startService实现批量下载示例](http://blog.csdn.net/iispring/article/details/48015475)

#### Service的原理

* [Android应用程序绑定服务（bindService）的过程源代码分析](http://blog.csdn.net/luoshengyang/article/details/6745181)
* [Android中IntentService的使用及其源码解析](http://blog.csdn.net/iispring/article/details/48046861)

#### Accessibility Services

* [Building Accessibility Services(建立可访问性服务)](http://www.android-doc.com/guide/topics/ui/accessibility/services.html)
* [Android Accessibility(辅助功能) –实现Android应用自动安装、卸载](http://blog.csdn.net/androidsecurity/article/details/41890369?utm_source=tuicool)
* [使用Android Accessibility实现免Root自动批量安装功能](http://www.infoq.com/cn/articles/android-accessibility-installing?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=global)

### ContentProvider

#### ContentProvider的原理及使用方法

* [Android ContentProvider和Uri详解 (绝对全面)](http://blog.sina.com.cn/s/blog_9f233c070101euqx.html)
* [Android应用程序组件Content Provider应用实例](http://blog.csdn.net/luoshengyang/article/details/6950440)
* [Android应用程序组件Content Provider的启动过程源代码分析](http://blog.csdn.net/luoshengyang/article/details/6963418)
* [Android应用程序组件Content Provider在应用程序之间共享数据的原理分析](http://blog.csdn.net/luoshengyang/article/details/6967204)
* [Android应用程序组件Content Provider的共享数据更新通知机制分析](http://blog.csdn.net/luoshengyang/article/details/6985171)

#### 启动过程

Contentprovider的onCreate方法在Application的onCreate方法前面 [android 应用的启动过程分析](http://www.jianshu.com/p/a1f40b39b3de)

### Handler

#### Handle的原理及机制

* [android的消息处理机制（图+源码分析）——Looper,Handler,Message](http://www.cnblogs.com/codingmyworld/archive/2011/09/12/2174255.html)
* [Android 异步消息处理机制 让你深入理解 Looper、Handler、Message三者关系](http://blog.csdn.net/lmj623565791/article/details/38377229)
* [深入源码解析Android中的Handler,Message,MessageQueue,Looper](http://blog.csdn.net/iispring/article/details/47180325)

#### Handler的发送处理消息的方法总会及各自的优缺点

#### Handler的正确使用方法

* [Handlers and memory leaks in Android](http://stackoverflow.com/questions/11278875/handlers-and-memory-leaks-in-android)

### Intent

#### Intent的原理及使用方法

* [Android中Intent概述及使用](http://blog.csdn.net/iispring/article/details/48417779)
* [Android中Intent对象与Intent Filter过滤匹配过程详解](http://blog.csdn.net/iispring/article/details/48481793)
* [Android中常见Intent习惯用法-上篇(附源码下载)](http://blog.csdn.net/iispring/article/details/48578295)

#### Intent属性

* [Android权限和动作大全](http://blog.csdn.net/github_25928675/article/details/46460417)

### View

#### View的绘制流程

* [Android View绘制流程](http://blog.csdn.net/wangjinyu501/article/details/9008271)
* [公共技术点之 View 绘制流程](http://a.codekk.com/detail/Android/lightSky/%E5%85%AC%E5%85%B1%E6%8A%80%E6%9C%AF%E7%82%B9%E4%B9%8B%20View%20%E7%BB%98%E5%88%B6%E6%B5%81%E7%A8%8B)
* [Android中measure过程、WRAP_CONTENT详解以及xml布局文件解析流程浅析(上)](http://blog.csdn.net/qinjuning/article/details/8051811)
* [Android中measure过程、WRAP_CONTENT详解以及xml布局文件解析流程浅析(下)](http://blog.csdn.net/qinjuning/article/details/8074262)
* [Android中View(视图)绘制不同状态背景图片原理深入分析以及StateListDrawable使用详解](http://blog.csdn.net/qinjuning/article/details/7474827)
* [Android中将布局文件/View添加至窗口过程分析 —- 从setContentView()谈起](http://blog.csdn.net/qinjuning/article/details/7226787)

#### View的事件分发原理

* [图解 Android 事件分发机制](http://www.jianshu.com/p/e99b5e8bd67b#)
* [Android 中Touch（触屏）事件传递机制](http://blog.csdn.net/wangjinyu501/article/details/22584465)
* [Android 编程下 Touch 事件的分发和消费机制](http://www.cnblogs.com/sunzn/archive/2013/05/10/3064129.html)
* [Android-onInterceptTouchEvent()和onTouchEvent()总结](http://blog.csdn.net/lvxiangan/article/details/9309927)
* [Android中View的量算、布局及绘图机制](http://blog.csdn.net/iispring/article/details/49203945)
* [源码解析Android中View的measure量算过程](http://blog.csdn.net/iispring/article/details/49403315)
* [源码解析Android中View的layout布局过程](http://blog.csdn.net/iispring/article/details/50366021)

#### 自定义View

* [自定义控件其实很简单(系列教程)](http://blog.csdn.net/aigestudio/article/details/41212583)

#### 自定义ViewGroup

* [Android 手把手教您自定义ViewGroup](http://blog.csdn.net/lmj623565791/article/details/38339817)
* [Android 自定义ViewGroup 实战篇 -> 实现FlowLayout](http://blog.csdn.net/lmj623565791/article/details/38352503)
* [Android中自定义View、ViewGroup理论基础详解](http://blog.csdn.net/iispring/article/details/51314039)

### 内存优化

#### 系统GC回收过程及原理

* [Java GC系列（1）：Java垃圾回收简介](http://www.importnew.com/13504.html)
* [Java GC系列（2）：Java垃圾回收是如何工作的？](http://www.importnew.com/13493.html)
* [Java GC系列（3）：垃圾回收器种类](http://www.importnew.com/13827.html)
* [Java GC系列（4）：垃圾回收监视和分析](http://www.importnew.com/13838.html)

#### 系统GC回收的触发条件

* [Android内存管理原理](http://www.cnblogs.com/killmyday/archive/2013/06/12/3132518.html)
* [Android 操作系统的内存回收机制](http://www.ibm.com/developerworks/cn/opensource/os-cn-android-mmry-rcycl/)

#### 内存优化

* [ANDROID内存优化(大汇总——上)](http://blog.csdn.net/a396901990/article/details/37914465)
* [ANDROID内存优化(大汇总——中)](http://blog.csdn.net/a396901990/article/details/38707007)
* [ANDROID内存优化(大汇总——全)](http://blog.csdn.net/a396901990/article/details/38904543)
* [Android性能优化之内存篇](http://hukai.me/android-performance-memory/)

#### UI优化

* [5个导致主线程卡顿较鲜为人知的元凶](http://blog.nimbledroid.com/2016/03/21/ways-to-hang-main-thread-zh.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
* [Android抽象布局——include、merge 、ViewStub](http://blog.csdn.net/xyz_lmn/article/details/14524567)
* [Performance Tuning On Android](http://blog.venmo.com/hf2t3h4x98p5e13z82pl8j66ngcmry/performance-tuning-on-android)

#### 性能优化

* [Android性能优化典范（一）](http://hukai.me/android-performance-patterns/)
* [Android性能优化典范（二）](http://hukai.me/android-performance-patterns-season-2/)
* [Android性能优化典范（三）](http://hukai.me/android-performance-patterns-season-3/)
* [Android性能优化典范（四）](http://hukai.me/android-performance-patterns-season-4/)
* [Android性能优化典范（五）](http://hukai.me/android-performance-patterns-season-5/)
* [Android应用性能优化个人总结–图形优化](https://mp.weixin.qq.com/s?__biz=MzAxMzYyNDkyNA==&mid=403778409&idx=1&sn=2955f5209f2cb46c327167e9f558013c&scene=0&key=710a5d99946419d93bd87693b2fb201a979a3f06f49072f49e0e5dd05b91de2dbe204e56cbcd8c71cac94e931791f5f3&ascene=0&uin=ODU2NjQ0ODgx&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.4+build(15E65)

#### 内存泄露详解及总结

* [Android 系统稳定性 - OOM（一）](http://rayleeya.iteye.com/blog/1956059)
* [Android 系统稳定性 - OOM（二）](http://rayleeya.iteye.com/blog/1956638)
* [Android 系统稳定性 - ANR（一）](http://rayleeya.iteye.com/blog/1955652)
* [Android 系统稳定性 - ANR（二）](http://rayleeya.iteye.com/blog/1955657)
* [Android 系统稳定性 - ANR（三）](http://rayleeya.iteye.com/blog/1956056)
* [Android内存优化之OOM](http://hukai.me/android-performance-oom/)
* [Android 内存泄漏总结](http://yq.aliyun.com/articles/3009)
* [ANDROID 探究oom内幕](http://www.360doc.com/content/14/0526/11/9462341_381066152.shtml)

#### 内存检测工具及使用方法

* [BlockCanary — 轻松找出Android App界面卡顿元凶](http://blog.zhaiyifan.cn/2016/01/16/BlockCanaryTransparentPerformanceMonitor/)
* [LeakCanary:检测所有的内存泄漏](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0509/2854.html)

### 网络

#### Socket的原理及使用

#### TCP、UDP的原理

#### Http通信原理

#### 常用网络框架

* [OkHttp](https://github.com/square/okhttp)
* [Volley]()
* [xUtils3](https://github.com/wyouflf/xUtils3)
* [Retrofit](https://github.com/square/retrofit)

#### 图片加载框架

* [Fresco](https://github.com/facebook/fresco)
* [Android-Universal-Image-Loader](https://github.com/nostra13/Android-Universal-Image-Loader)
* [Glide](https://github.com/bumptech/glide)
* [picasso](https://github.com/square/picasso)
* [Android 三大图片缓存原理、特性对比](http://www.trinea.cn/android/android-image-cache-compare/)

### Bluetooth

#### 蓝牙2.0

1. Bluetooth介绍及原理
2. Bluetooth通信方式
3. Bluetooth使用方法

#### 蓝牙4.0

1. BLE介绍及原理
2. BLE通信方式
3. BLE的使用方法

### 传感器

#### 加速度

#### 磁力

#### 方向

#### 陀螺

#### 光线感应

#### 压力

#### 温度

#### 接近

#### 重力

#### 线性加速度

#### 旋转矢量

### 开发框架

#### 绘图框架

AChartEngine、MPAndroidChart、XCL-Charts、EazeGraph、WilliamChart、HelloCharts for Android

#### 数据库框架

Provider，ORMLite，GreenDao [Provider，ORMLite，GreenDao的实现，并且简单性能对比](http://blog.csdn.net/u012565107/article/details/21546829)

#### 注解

* [Butter Knife](https://github.com/JakeWharton/butterknife)
* [Dragger2](https://github.com/google/dagger)

### Android换肤实现

* [ChangeSkin](https://github.com/hongyangAndroid/ChangeSkin)
* [Colorful](https://github.com/bboyfeiyu/Colorful)
* [Android-Skin-Loader](https://github.com/fengjundev/Android-Skin-Loader)
* [NightOwl](https://github.com/ashqal/NightOwl)
* [MultipleTheme(实现有点重)](https://github.com/dersoncheng/MultipleTheme)
* [Prism](https://github.com/StylingAndroid/Prism)
* [Android换肤总结](http://blog.zhaiyifan.cn/2015/09/10/Android%E6%8D%A2%E8%82%A4%E6%8A%80%E6%9C%AF%E6%80%BB%E7%BB%93/)

### Android资源混淆

* [美团Android资源混淆保护实践](http://tech.meituan.com/mt-android-resource-obfuscation.html)


### 相关LINK

* [Android 知识梳理](http://www.codemx.cn/2016/05/04/2016-05-04-Android-Tree/#more)
