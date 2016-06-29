title: "Android测试资源汇总"
date: 2016-06-28 16:44:12
categories: 
    - 测试
---

### 主流资源

#### 国内

* [Testin](http://www.testin.cn/)
* [MTC](http://mtc.baidu.com/)
* [易测云](http://www.yiceyun.com/)

#### 国外

* [TestCloud](http://www.test-cloud.com/)
* [Testdroid](http://testdroid.com/)
* [nimbledroid](https://nimbledroid.com/) Automated performance analysis website
* [Test bird](http://en.testbird.com/) APP和手游测试专家是全球第一手游自动化云测试和移动APP测试平台

#### 第三方性能采集SDK

* [OneAPM](http://www.oneapm.com/)
* [听云](http://www.tingyun.com/sem1.html)

#### 自动化测试

* [CircleCI](https://circleci.com/) 一个基于Github的自动化测试，单元测试工具，提供一个免费的私有仓库。

### Google官方学习资料

* [Android Testing Support library (ATSL)](https://google.github.io/android-testing-support-library/) 【重点】
相关视频： [Android Testing (Android Dev Summit 2015)](https://www.youtube.com/watch?v=vdasFFfXKOY) youtube 2015年视频
* Developer Api [Testing Concepts](http://developer.android.com/tools/testing/testing_android.html)
* [Best Practices for Testing](http://developer.android.com/training/testing.html) 【最新】


### 博客

* [Leveraging product flavors in Android Studio for hermetic testing](http://android-developers.blogspot.com/2015/12/leveraging-product-flavors-in-android.html) 与之对应的[codelab](https://www.code-labs.io/codelabs/android-testing/index.html#0)学习地址
* [Test coverage report for Android application](http://blog.wittchen.biz.pl/test-coverage-report-for-android-application/) 使用jacoco-android plugin in build.gradle进行测试覆盖率报告
* [Android单元测试在蘑菇街支付金融部门的实践](http://chriszou.com/2016/04/25/android-unit-testing-wechat-group-share.html#rd) 很详细介绍了单元测试在实践操作中的使用

#### RxJava Test

* [Unit Testing RxJava Observables and Subscriptions](http://fedepaol.github.io/blog/2015/09/13/testing-rxjava-observables-subscriptions/)
* [Unit Testing RxJava Observables](https://medium.com/ribot-labs/unit-testing-rxjava-6e9540d4a329)
* [Unit Testing with RxJava](http://alexismas.com/blog/2015/05/20/unit-testing-rxjava/)

### 相关测试框架

* [Junit4 Github](https://github.com/junit-team/junit4) A programmer-oriented testing framework for Java.
* [mockito](https://github.com/mockito/mockito) Tasty mocking framework for unit tests in Java
* [JMockit](http://jmockit.org/) An automated testing toolkit for Java.[对比Mockito和JMockit的文章](http://stackoverflow.com/questions/4105592/comparison-between-mockito-vs-jmockit-why-is-mockito-voted-better-than-jmockit)
* [robolectric](http://robolectric.org/) is a unit test framework that de-fangs the Android SDK jar so you can test-drive the development of your Android app. Tests run inside the JVM on your workstation in seconds
* [RoboSpock Github](https://github.com/robospock/RoboSpock) A testing framework which brings powers of Spock and Groovy to Android app testing http://robospock.org

### OpenSource

#### Collection

* [awesome-android-testing](http://github.com/hotchemi/awesome-android-testing) collection of android test info 【重点】

#### Sample

* [android-gradle-java-template](https://github.com/jaredsburrows/android-gradle-java-template) Gradle + Android Studio + Robolectric + Espresso + Mockito + EasyMock/PowerMock + JaCoCo Demo
* [Android-Clean-Testing](https://github.com/txusballesteros/Android-Clean-Testing) Android Testing Sample Project

#### Google Sample

* [android-testing-templates](http://https//github.com/googlesamples/android-testing-templates)
* [android-testing](http://https//github.com/googlesamples/android-testing) A collection of samples demonstrating different frameworks and techniques for automated testing

#### Tool

* Android Studio 2.2 Preview new feature:
    * `Espresso Test Recorder` **菜单/run/Recorder Expresso Test** 选项可以记录你的操作并转化为`Espresso`的测试代码
    * `APK Analyzer` **菜单/build/Analyzer APK** 提供APK大小分析工具，清楚的知道代码体积变换的趋势。

* [screengrab](https://github.com/fastlane/screengrab) 当UI Tests 时自动化截屏

* [STF](http://github.com/openstf/stf) Control and manage Android devices from your browser 远程控制，一台电脑控制测试多个测试设备

* [stetho](https://github.com/facebook/stetho) Facebook开源，很强大的Android网络和数据库调试工具。[中文教程](http://www.open-open.com/lib/view/open1429362252939.html)

* [augmented-traffic-control](https://github.com/facebook/augmented-traffic-control) Fackbook开源项目模拟移动网络，对App的调试及网络优化有很大的帮助，主要参数有：
    * 网络带宽（bandwidth）
    * 延迟（latency）
    * 丢包率（packet loss）
    * 错包率（corrupted packets）
    * 乱序率（packets ordering）

#### purchase UI Tool

* [Robotium Recorder](http://robotium.com/)
