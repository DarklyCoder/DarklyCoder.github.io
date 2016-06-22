
title: appium自动化测试
date: 2016-6-22 10:30:00
categories: 
    - 测试
tags: 
    - appium 
---

### 什么是appium

1. [appium][1]是开源的移动端自动化测试框架；
2. [appium][1]可以测试native/hybrid/mobile web项目；
3. [appium][1]可以测试ios/android应用（当然了，还有firefox os）；
4. [appium][1]是跨平台的，可以用在OS X，Windows以及linux桌面系统上；

<!-- more -->

### appium server的安装

1. 安装nodejs；
2. 使用`npm i appium -g`安装appium server。

### appium client的安装

appium client是对webdriver原生api的一些扩展和封装。它可以帮助我们更容易的写出用例，写出更好懂的用例。

appium client是配合原生的webdriver来使用的，因此二者必须配合使用缺一不可。


#### ruby篇（一定要在线安装）

ruby的appium client叫做appium lib，为什么是这样就不解释了，总之是历史原因。

首先update rubygem和bundler(说老实话，真的不需要，但官方文档上这么写)

    gem update –system;
    gem update bundler

然后使用gem安装

    gem uninstall -aIx appium_lib ;(这个也不是必须的)
    gem install –no-rdoc –no-ri appium_lib

#### python篇（尽量在线安装）

推荐使用pip安装

    pip install Appium-Python-Client

当然了也可以在Pipy上[下载源码安装](https://pypi.python.org/pypi/Appium-Python-Client)

    tar -xvf Appium-Python-Client-X.X.tar.gz（windows上用7zip可以解压）
    cd Appium-Python-Client-X.X
    python setup.py install

最后，也可以通过github安装（要git客户端）

    git clone git@github.com:appium/python-client.git
    cd python-client
    python setup.py install

#### java篇（在线安装）

java的话用maven安装就可以了

    io.appium
    java-client
    4.0.0

当然了，也可以自己[下载jar包](http://search.maven.org/#search|gav|1|g:"io.appium" AND a:"java-client")，请自行选择最新版本。

### appium测试

1. 安装好后运行appium,在cmd中输入`appium`；

        D:\Appium-Python-Client-0.22>appium
        [Appium] Welcome to Appium v1.5.3
        [Appium] Appium REST http interface listener started on 0.0.0.0:4723

2. 以android平台为例，编写`appiumTest.py`；

        from appium import webdriver

        desired_caps = {}
        desired_caps['platformName'] = 'Android'
        desired_caps['platformVersion'] = '6.0'
        desired_caps['deviceName'] = 'huawei-huawei_p7_l07-5T2SQL151Y003684'
        desired_caps['appPackage'] = 'com.android.demo'
        desired_caps['appActivity'] = '.SplashActivity'

        driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

3. 连接手机，运行`appiumTest.py`脚本。

### appium的相关概念

#### Client/Server架构

appium的核心其实是一个暴露了一系列REST API的server。

这个server的功能其实很简单：监听一个端口，然后接收由client发送来的command。翻译这些command，把这些command转成移动设备可以理解的形式发送给移动设备，然后移动设备执行完这些command后把执行结果返回给appium server，appium server再把执行结果返回给client。

在这里client其实就是发起command的设备，一般来说就是我们代码执行的机器，执行appium测试代码的机器。狭义点理解，可以把client理解成是代码，这些代码可以是java/ruby/python/js的，只要它实现了webdriver标准协议就可以。

这样的设计思想带来了一些好处：

1. 可以带来多语言的支持；
2. 可以把server放在任意机器上，哪怕是云服务器都可以；（是的，appium和webdriver天生适合云测试）

#### Session

session就是一个会话，在webdriver/appium，你的所有工作永远都是在session start后才可以进行的。一般来说，通过POST /session这个URL，然后传入Desired Capabilities就可以开启session了。

开启session后，会返回一个全局唯一的session id，以后几乎所有的请求都必须带上这个session id，因为这个seesion id代表了你所打开的浏览器或者是移动设备的模拟器。

进一步思考一下，由于session id是全局唯一，那么在同一台机器上启动多个session就变成了可能，这也就是selenium gird所依赖的具体理论根据。

#### Desired Capabilities

Desired Capabilities携带了一些配置信息。从本质上讲，这个东东是key-value形式的对象。你可以理解成是java里的map，python里的字典，ruby里的hash以及js里的json对象。实际上Desired Capabilities在传输时就是json对象。

Desired Capabilities最重要的作用是告诉server本次测试的上下文。这次是要进行浏览器测试还是移动端测试？如果是移动端测试的话是测试android还是ios，如果测试android的话那么我们要测试哪个app？ server的这些疑问Desired Capabilities都必须给予解答，否则server不买账，自然就无法完成移动app或者是浏览器的启动。

#### Appium Server

这就是每次我们在命令行用appium命令打开的东西。

#### Appium Clients

由于原生的webdriver api是为web端设计的，因此在移动端用起来会有点不伦不类。appium官方提供了一套appium client，涵盖多种语言ruby/java/python，在我看来ruby client是实现最好的。在测试的时候，一般要使用这些client库去替换原生的webdriver库。这实际上不是替换，算是client对原生webdriver进行了一些移动端的扩展，加入了一些方便的方法，比如swipe之类，appium client让我们可以更方便的写出可读性更好的测试用例。

#### Appium.app, Appium.exe

appium server的GUI版本，前者用在osx上，后者是windows上。可视化、不需要装node，可以看app的UI结构是这个东东的卖点。

### Desired Capabilities详解

Desired Capabilities在启动session的时候是必须提供的。

Desired Capabilities本质上是key value的对象，它告诉appium server这样一些事情：

* 本次测试是启动浏览器还是启动移动设备？
* 是启动andorid还是启动ios？
* 启动android时，app的package是什么？
* 启动android时，app的activity是什么？

Appium的Desired Capabilities是扩展了webdriver的Desired Capabilities的，下面的一些通用配置是需要指定的：

* automationName：使用哪种自动化引擎。appium（默认）还是Selendroid？
* platformName：使用哪种移动平台。iOS, Android, orFirefoxOS？
* deviceName：启动哪种设备，是真机还是模拟器？iPhone Simulator, iPad Simulator, iPhone Retina 4-inch, Android Emulator, Galaxy S4, etc…
* app：应用的绝对路径，注意一定是绝对路径。如果指定了appPackage和appActivity的话，这个属性是可以不设置的。另外这个属性和browserName属性是冲突的。
* browserName：移动浏览器的名称。比如Safari’ for iOS and ‘Chrome’, ‘Chromium’, or ‘Browser’ for Android；与app属性互斥。
* udid：物理机的id。比如1ae203187fc012g。

android平台特定属性：

* appActivity：待测试的app的Activity名字。比如MainActivity, .Settings。注意，原生app的话要在activity前加个”.”。
* appPackage：待测试的app的java package。比如com.example.android.myApp, com.android.settings。

### 相关参考

[appium简明教程](http://www.yangyanxing.com/article/1266.html)

[webdriver使用](https://github.com/DarklyCoder/webdriver_guide)

[1]: http://appium.io/     "appium"
