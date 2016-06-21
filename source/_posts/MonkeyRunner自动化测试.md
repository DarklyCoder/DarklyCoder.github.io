
title: MonkeyRunner自动化测试
date: 2016-6-21 16:00:00
categories: 
    - 测试
tags: 
    - MonkeyRunner 
---

### 什么是MonkeyRunner

[MonkeyRunner](http://developer.android.com/guide/developing/tools/monkey.html)([镜像](http://wear.techbrood.com/tools/help/monkeyrunner_concepts.html))工具提供了一个API，使用此API写出的程序可以在Android代码之外控制Android设备和模拟器。通过monkeyrunner，您可以写出一个Python程序去安装一个Android应用程序或测试包，运行它，向它发送模拟击键，截取它的用户界面图片，并将截图存储于工作站上。monkeyrunner工具的主要设计目的是用于测试功能/框架水平上的应用程序和设备，或用于运行单元测试套件，但您当然也可以将其用于其它目的。

<!-- more -->

### monkeyrunner工具同Monkey工具的差别

* Monkey：Monkey工具直接运行在设备或模拟器的adb shell中，生成用户或系统的伪随机事件流,一般用于压力测试。

* monkeyrunner：monkeyrunner工具则是在工作站上通过API定义的特定命令和事件控制设备或模拟器。

### monkeyrunner的测试类型

1. 多设备控制：monkeyrunner API可以跨多个设备或模拟器实施测试套件。您可以在同一时间接上所有的设备或一次启动全部模拟器（或统统一起），依据程序依次连接到每一个，然后运行一个或多个测试。您也可以用程序启动一个配置好的模拟器，运行一个或多个测试，然后关闭模拟器。
2. 功能测试：monkeyrunner可以为一个应用自动贯彻一次功能测试。您提供按键或触摸事件的输入数值，然后观察输出结果的截屏。
3. 回归测试：monkeyrunner可以运行某个应用，并将其结果截屏与既定已知正确的结果截屏相比较，以此测试应用的稳定性。
4. 可扩展的自动化：由于monkeyrunner是一个API工具包，您可以基于Python模块和程序开发一整套系统，以此来控制Android设备。除了使用monkeyrunner API之外，您还可以使用标准的Python os和subprocess模块来调用Android Debug Bridge这样的Android工具。

### 运行monkeyrunner

配置好android sdk tools的环境变量，你就可以直接在`cmd`中运行`monkeyrunner`，您可以直接使用一个代码文件运行monkeyrunner，抑或在交互式对话中输入monkeyrunner语句。不论使用哪种方式，您都需要调用SDK目录的tools子目录下的monkeyrunner命令。如果您提供一个文件名作为运行参数，则monkeyrunner将视文件内容为Python程序，并加以运行；否则，它将提供一个交互对话环境。

monkeyrunner的命令语法为：`monkeyrunner -plugin <plugin_jar> <program_filename> <program_options>`

运行Python脚本文件最好带上绝对路径，不然可能会报错：`Can't open specified script file Usage: monkeyrunner [options] SCRIPT_FILE`

### monkeyrunner API

monkeyrunner在`com.android.monkeyrunner`包下，包含3个模块

* MonkeyRunner: monkeyrunner工具类. 提供连接monkeyrunner与设备的方法。
* MonkeyDevice: 表示物理设备或模拟器。提供安装/卸载apk、启动Activity、模拟键盘或触摸事件等功能。
* MonkeyImage: 表示屏幕截图。提供获取截图、bitmap转换、比较两个截图、写入文件等功能。

在Python脚本里,你可以把每个类作为一个Python模块去访问。monkeyrunner工具没有自动包含这个模块。你可以使用以下代码导入模块:

    from com.android.monkeyrunner import <module,module>

### monkeyrunnerTest.py样例

```
# Imports the monkeyrunner modules used by this program
from com.android.monkeyrunner import MonkeyRunner, MonkeyDevice

# Connects to the current device, returning a MonkeyDevice object
device = MonkeyRunner.waitForConnection()

# Installs the Android package. Notice that this method returns a boolean, so you can test
# to see if the installation worked.
device.installPackage('myproject/bin/MyApplication.apk')

# sets a variable with the package's internal name
package = 'com.example.android.myapplication'

# sets a variable with the name of an Activity in the package
activity = 'com.example.android.myapplication.MainActivity'

# sets the name of the component to start
runComponent = package + '/' + activity

# Runs the component
device.startActivity(component=runComponent)

# Presses the Menu button
device.press('KEYCODE_MENU', MonkeyDevice.DOWN_AND_UP)

# Takes a screenshot
result = device.takeSnapshot()

# Writes the screenshot to a file
result.writeToFile('myproject/shot1.png','png')
```
