
title: Monkey自动化测试
date: 2016-6-21 14:04:00
categories: 
    - 测试
tags: 
    - Monkey 
---

## Monkey 参数介绍

### 什么是Monkey

  Monkey是Android中的一个命令行工具，可以运行在模拟器里或实际设备中。它向系统发送伪随机的用户事件流(如按键输入、触摸屏输入、手势输入等)，实现对正在开发的应用程序进行压力测试。Monkey测试是一种为了测试软件的稳定性、健壮性的快速有效的方法。

### Monkey的特征

1. 测试的对象仅为应用程序包，有一定的局限性。 
2. Monky测试使用的事件流数据流是随机的，不能进行自定义。 
3. 可对MonkeyTest的对象，事件数量，类型，频率等进行设置。

<!-- more -->

### Monkey程序介绍

1. Monkey程序由Android系统自带，使用Java语言写成，在Android文件系统中的存放路径是：`/system/framework/monkey.jar`； 
2. Monkey.jar程序是由一个名为`monkey`的Shell脚本来启动执行，shell脚本在Android文件系统中的存放路径是：`/system/bin/monkey`；

这样就可以通过在CMD窗口中执行: `adb shell monkey ｛+命令参数｝`来进行Monkey测试了。

### Monkey命令的简单帮助

要获取Monkey命令自带的简单帮助，在CMD中执行命令：

    adb shell monkey –help

### Monkey命令参数介绍 

#### Monkey通用命令格式：

    monkey [options] <随机事件的次数> [保存到具体路径下]

Monkey 选项的概括： 

* 基本配置 选项，如设置尝试的事件数量。 
* 运行约束选项，如设置只对单独的一个包进行测试。 
* 事件类型 和频率。 
* 调试选项。

#### 参数：`-p` 

用于约束限制，用此参数指定一个或多个包（package，即App）。指定包之后，Monkey将只允许系统启动指定的APP。如果不指定包，Monkey将允许系统启动设备中的所有APP。 

* 指定一个包：`monkey -p com.htc.Weather 100` (com.htc.Weather为包名，100是事件计数,即让Monkey程序模拟100次随机用户事件); 
* 指定多个包：`monkey -p com.htc.Weather –p com.htc.pdfreader -p com.htc.photo.widgets 100`; 
* 不指定包：`monkey 100` (Monkey随机启动APP并发送100个随机事件); 
* 要查看设备中所有的包，在CMD窗口中执行以下命令：

        adb shell 
        cd data/data 
        ls（需要root）

#### 参数: `-v`

用于指定反馈信息级别（信息级别就是日志的详细程度），总共分3个级别，分别对应的参数如下表所示：

|日志级别|使用说明|示例|
|------------|-----------|--------|
|Level_0|缺省值，仅提供启动提示、测试完成和最终结果等少量信息|`monkey -p com.htc.Weather –v 100`|
|Level_1|提供较为详细的日志，包括每个发送到Activity的事件信息|`monkey -p com.htc.Weather –v -v 100`|
|Level_2|最详细的日志，包括了测试中选中/未选中的Activity信息|`monkey -p com.htc.Weather –v -v –v 100`|

#### 参数：`-s`

用于指定伪随机数生成器的seed值，如果seed相同，则两次Monkey测试所产生的事件序列也相同的。

示例： 

Monkey测试1：`monkey -p com.htc.Weather –s 10 100` 

Monkey测试2：`monkey -p com.htc.Weather –s 10 100`
 
两次测试的效果是相同的，因为模拟的用户操作序列（每次操作按照一定的先后顺序所组成的一系列操作，即一个序列）是一样的。操作序列虽然是随机生成的，但是只要我们指定了相同的Seed值，就可以保证两次测试产生的随机操作序列是完全相同的，所以这个操作序列伪随机的。

#### 参数：`–throttle` <毫秒>

用于指定用户操作（即事件）间的时延，单位是毫秒,可以控制monkey的执行速度，如果不指定该选项，monkey事件间将不会延时。

示例：`monkey -p com.htc.Weather –throttle 3000 100`

#### 参数：`–ignore-crashes`

用于指定当应用程序崩溃时（Force& Close错误），Monkey是否停止运行。如果使用此参数，即使应用程序崩溃，Monkey依然会发送事件到事件计数完成。

示例1：`monkey -p com.htc.Weather –ignore-crashes 1000`

测试过程中即使Weather程序崩溃，Monkey依然会继续发送事件直到事件数目达到1000为止；

示例2：`monkey -p com.htc.Weather 1000`

测试过程中，如果Weather程序崩溃，Monkey将会停止运行。

#### 参数：`–ignore-timeouts`

用于指定当应用程序发生ANR（Application No Responding）错误时，Monkey是否停止运行。如果使用此参数，即使应用程序发生ANR错误，Monkey依然会发送事件，直到事件计数完成。

#### 参数：`–ignore-security-exceptions`

用于指定当应用程序发生许可错误时（如证书许可，网络许可等），Monkey是否停止运行。如果使用此参数，即使应用程序发生许可错误，Monkey依然会发送事件，直到事件计数完成。

#### 参数：`–kill-process-after-error`

用于指定当应用程序发生错误时，是否停止其运行。如果指定此参数，当应用程序发生错误时，应用程序停止运行并保持在当前状态（注意：应用程序仅是静止在发生错误时的状态，系统并不会结束该应用程序的进程）。

#### 参数：`–monitor-native-crashes`

用于指定是否监视并报告应用程序发生崩溃的本地代码。

#### 参数： `–dbg-no-events`

Monkey将执行初始启动，进入一个测试Activity，并不会再进一步生成事件。为了得到最佳结果，结合参数-v，一个或多个包的约束，以及一个保持Monkey运行30秒或更长时间的非零值，从而提供了一个可以监视应用程序所调用的包之间转换的环境。

#### 参数：`–hprof`

将在Monkey生成事件序列前后生成profilling报告。在data/misc路径下生成大文件（~5Mb），所以要小心使用。

#### 参数：`–wait-dbg`

停止执行中的Monkey，直到有调试器和它相连接。

#### 参数：`–pct-｛+事件类别｝｛+事件类别百分比｝`

用于指定每种类别事件的数目百分比（在Monkey事件序列中，该类事件数目占总事件数目的百分比），如下表所示:

|参数|使用说明|示例|
|------------|-----------|--------|
|–pct-touch ｛+百分比｝     | 调整触摸事件的百分比(触摸事件是一个down-up事件，它发生在屏幕上的某单一位置)                                              | monkey -p com.htc.Weather –pct-touch 10 1000    |
|–pct-motion｛+百分比｝     | 调整动作事件的百分比(动作事件由屏幕上某处的一个down事件、一系列的伪随机事件和一个up事件组成)                               | monkey -p com.htc.Weather –pct-motion 20 1000  |
|–pct-trackball｛+百分比｝  | 调整轨迹事件的百分比(轨迹事件由一个或几个随机的移动组成，有时还伴随有点击)                                                | monkey -p com.htc.Weather –pct-touch 10 1000  |
|–pct-nav｛+百分比｝        | 调整“基本”导航事件的百分比(导航事件由来自方向输入设备的up/down/left/right组成)                                           | monkey -p com.htc.Weather–pct-nav 40 1000     |
|–pct-majornav｛+百分比｝   | 调整“主要”导航事件的百分比(这些导航事件通常引发图形界面中的动作，如：5-way键盘的中间按键、回退按键、菜单按键)               | monkey -p com.htc.Weather–pct-majornav 50 1000 |
|–pct-syskeys｛+百分比｝    | 调整“系统”按键事件的百分比(这些按键通常被保留，由系统使用，如Home、Back、Start Call、End Call及音量控制键)                | monkey -p com.htc.Weather–pct-syskeys 60 1000 |
|–pct-appswitch｛+百分比｝  | 调整启动Activity的百分比。在随机间隔里，Monkey将执行一个startActivity()调用，作为最大程度覆盖包中全部Activity的一种方法    | monkey -p com.htc.Weather–pct-appswitch 70 1000 |
|–pct-anyevent｛+百分比｝   | 调整其它类型事件的百分比。它包罗了所有其它类型的事件，如：按键、其它不常用的设备按钮、等等                                  | monkey -p com.htc.Weather –pct-anyevent 100 1000 |

* 指定多个类型事件的百分比： `adb shell monkey -p com.htc.Weather–pct-anyevent 50 –pct-appswitch 50 1000` 注意：各事件类型的百分比总数不能超过100%；


#### 综合使用

```
monkey –throttle 500 -s 600 –ignore-crashes –ignore-timeouts –ignore-security-exceptions –ignore-native-crashes –monitor-native-crashes -v -v -v 800000 >/mnt/sdcard/all_report01.txt
 
monkey -p com.lenovo.ideafriend –ignore-crashes –ignore-timeouts –ignore-native-crashes –pct-touch 30 -s 1 -v -v –throttle 200 100000 2>/sdcard/error.txt 1>/sdcard/info.txt
```

#### 停止Monkey方法

最近用monkey来包apk的性能测试，发现一旦monkey跑起来以后，即使将数据线和PC断开，monkey脚本还是会继续运行下去。结果找到了一个办法去停止它：
```
adb shell
top | grep monkey
```
显示如下：
```
top | grep monkey
5447 0 1% S 10 262960K 10328K root com.android.commands.monkey 
5447 0 0% S 10 262960K 10324K root com.android.commands.monkey
```
找到id为5447，然后再kill掉就OK了
```
adb shell
kill -9 5447
```