title: Android-高斯模糊实现方案
date: 2016-05-09 17:27:48
categories: 
    - Android
tags: 
    - Android 
    - 高斯模糊
    - RenderScript
---

　　一直想看一下Android上如何实现毛玻璃效果，今天闲着没事在网上搜索了一下，总结如下:
* 使用RenderScript实现,参考[RxBlur](https://github.com/SmartDengg/RxBlur)
* 使用FastBlur的java版实现,参考[stackblur](https://github.com/kikoso/android-stackblur)
* 使用openGL实现，参考[Muzei](https://github.com/romannurik/muzei)

　　我试了一下RenderScript和FastBlur实现，速度还可以，在使用高斯模糊前先进行图片缩放，这样速度会更快！
