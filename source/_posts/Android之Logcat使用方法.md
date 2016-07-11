
title: Android之Logcat使用方法
date: 2016-6-22 15:04:00
categories: 
    - Android
tags: 
    - Logcat 
---

### 什么是Logcat

`Logcat`是Android中一个命令行工具，可以用于得到程序的log信息。

<!-- more -->

### 使用Logcat命令

在命令行中输入 `adb logcat --help` 命令, 就可以显示该命令的帮助信息:

```
octopus@octopus:~$ adb logcat --help  
Usage: logcat [options] [filterspecs]  
options include:  
  -s              Set default filter to silent.  
                  Like specifying filterspec '*:s'  
  -f <filename>   Log to file. Default to stdout  
  -r [<kbytes>]   Rotate log every kbytes. (16 if unspecified). Requires -f  
  -n <count>      Sets max number of rotated logs to <count>, default 4  
  -v <format>     Sets the log print format, where <format> is one of:  
  
                  brief process tag thread raw time threadtime long  
  
  -c              clear (flush) the entire log and exit  
  -d              dump the log and then exit (don't block)  
  -t <count>      print only the most recent <count> lines (implies -d)  
  -g              get the size of the log's ring buffer and exit  
  -b <buffer>     Request alternate ring buffer, 'main', 'system', 'radio'  
                  or 'events'. Multiple -b parameters are allowed and the  
                  results are interleaved. The default is -b main -b system.  
  -B              output the log in binary  
filterspecs are a series of   
  <tag>[:priority]  
  
where <tag> is a log component tag (or * for all) and priority is:  
  V    Verbose  
  D    Debug  
  I    Info  
  W    Warn  
  E    Error  
  F    Fatal  
  S    Silent (supress all output)  
  
'*' means '*:d' and <tag> by itself means <tag>:v  
  
If not specified on the commandline, filterspec is set from ANDROID_LOG_TAGS.  
If no filterspec is found, filter defaults to '*:I'  
  
If not specified with -v, format is set from ANDROID_PRINTF_LOG  or defaults to "brief" 
```

adb logcat 命令格式：`adb logcat [选项] [过滤项]`, 其中 **选项** 和 **过滤项** 在中括号 **[]** 中, 说明这是可选的;

### 选项命令列表 

|命令|说明|
|---|---|
|`-s`| 设置输出日志的标签, 只显示该标签的日志|
|`-f <filename>`| 指定输出日志信息的`<filename>`，默认是stdout|
|`-r <kbytes>`| 每`<kbytes>`时输出日志，默认值为16，需要和`-f`选项一起使用|
|`-n <count>`|	设置日志的最大数目`<count>`， 默认值是4，需要和 `-r` 选项一起使用|
|`-v <format>`|	设置日志输入格式，默认的是`brief`格式|
|`-c`| 清除所有log并退出|
|`-d`| 得到所有log并退出,不阻塞|
|`-t`| 输出最近的几行日志,输出完退出,不阻塞|
|`-g`|	输出指定的日志缓冲区，输出后退出|
|`-b <buffer>`|	加载一个可使用的日志缓冲区供查看，比如event 和radio . 默认值是main|
|`-B`|	以二进制形式输出日志|

#### 输出指定标签内容 `-s` 

"-s"选项 : 设置默认的过滤器, 如 我们想要输出 "System.out" 标签的信息, 就可以使用`adb logcat -s System.out`命令;

```
octopus@octopus:~$ adb logcat -s System.out  
--------- beginning of /dev/log/system  
--------- beginning of /dev/log/main  
I/System.out(22930): GSM -91
I/System.out(22930): SignalStrength issssssssss : -91
I/System.out(22930): Supervisor Thread  
```

#### 输出日志信息到文件

##### "-f"选项

 "-f"选项 : 该选向后面跟着输入日志的文件, 使用`adb logcat -f /sdcard/log.txt`命令, 注意这个log文件是输出到手机上，需要指定合适的路径。
```
octopus@octopus:~$ adb logcat -f /sdcard/log.txt   
```

这个参数对对不能一直用电脑连着手机收集日志的场景非常有用，其实Android shell下也有一个相同参数的logcat命令。使用如下命令可以执行后断开PC和手机持续收集LOG。

```
shell@pc$ adb shell  
shell@android$ logcat -f /sdcard/log.txt &   #这里的&符号表示后台执行，别少了。  
shell@android$ exit 
```

注：
1. 以上`shell@pc$`指在pc的shell终端执行后边的命令，`shell@android$`表示在手机shell中执行后边的命令
2. 一定注意合适的时候需要停止掉以上命令，否则再次使用相同命令的时候，就会有两个logcat写同一个文件了
3. adb logcat -f /sdcard/log.txt 这个必须要求要root权限；但`adb locat >d:log.txt` 就不需要root权限。

停止方法:
``` 
 adb shell kill -9 <logcat_pid>
```
其中logcat_pid 通过如下命令获取
* `adb shell ps | grep logcat`        # linux 平台
* `adb shell ps | findstr "logcat"`   #Windows平台

##### `>`输出

 `>`输出 : `>`后面跟着要输出的日志文件, 可以将 logcat 日志输出到文件中, 使用`adb logcat > log`命令, 使用`more log`命令查看日志信息;

```
octopus@octopus:~$ adb logcat > log  
^C  
octopus@octopus:~$ more log  
--------- beginning of /dev/log/system  
V/ActivityManager(  500): We have pending thumbnails: null  
V/ActivityManager(  500): getTasks: max=1, flags=0, receiver=null  
V/ActivityManager(  500): com.android.settings/.Settings: task=TaskRecord{42392278 #448 A com.android.settings U 0}  
V/ActivityManager(  500): We have pending thumbnails: null  
```

#####  `-d -f <log>` 组合命令

`-d -f <log>`组合命令：可以将日志保存到手机上的指定位置，对不能一直用电脑连着手机收集日志的场景非常有用。

```
adb logcat -d -f /sdcard/mylog.txt 
```

####  指定logcat的日志输出格式

日志信息包括了许多元数据域包括标签和优先级。可以修改日志的输出格式，所以可以显示出特定的元数据域。可以通过 `-v` 选项得到格式化输出日志的相关信息。

|OPTION|DESC|
|---|---|
|brief |`优先级 / 标签 (进程ID) : 日志信息`|
|process | `优先级 (进程ID) : 日志信息` |
|tag | ` 优先级 / 标签 : 日志信息`|
|thread | `优先级 ( 进程ID : 线程ID) 标签 : 日志内容` |
|raw |  只输出日志信息, 不附加任何其他 信息, 如 优先级 标签等 |
|time | `日期 时间 优先级 / 标签 (进程ID) : 进程名称 : 日志信息`|
|long | `[ 日期 时间 进程ID : 线程ID 优先级 / 标签] 日志信息`|

当启动了logcat ，你可以通过`-v`选项来指定输出格式: `[adb] logcat [-v <format>]`

例如用 `thread` 来产生的日志格式: `adb logcat -v thread` ,需要注意的是你只能`-v`选项来规定输出格式。 

#### 清空日志缓存信息

清空日志缓存信息 : 使用 `adb logcat -c` 命令, 可以将之前的日志信息清空, 重新开始输出日志信息;

#### 将缓存日志输出

将缓存日志输出 : 使用 `adb logcat -d` 命令, 输出命令, 之后推出命令, 不会进行阻塞;

#### 输出最近的日志

输出最近的日志 : 使用 `adb logcat -t 5` 命令, 可以输出最近的5行日志, 并且不会阻塞;

#### 查看可用日志缓冲区

Android日志系统有循环缓冲区，并不是所有的日志系统都有默认循环缓冲区。为了得到日志信息，你需要通过`-b`选项来启动logcat。如果要使用循环缓冲区，你需要查看剩余的循环缓冲期:

|OPTION|DESC|
|---|---|
|system | 与系统相关的日志信息|
|radio | 广播电话相关的日志信息|
|events | 查看和事件相关的的缓冲区|
|main | 默认的缓冲区|

`-b`选项使用方法: `[adb] logcat [-b <buffer>]`

例如查看日志缓冲区包含radio 和 telephony信息: `adb logcat -b radio`

#### 以二进制形式输出日志

以二进制形式输出日志 : 使用 adb logcat -B 命令;

### 过滤项命令列表

过滤项格式 : <tag>[:priority] , 标签:日志等级, 默认的日志过滤项是 " *:I " ;

|LEVEL|DESC|
|---|---|
|V| Verbose (明细) |
|D| Debug (调试) |
|I| Info (信息) |
|W| Warn (警告) |
|E| Error (错误) |
|F| Fatal (严重错误) |
|S| Silent(Super all output) (最高的优先级, 可能不会记载东西)|

* 过滤指定等级日志 : 使用 `adb logcat 10 *:E`命令, 显示 `Error` 以上级别的日志;

* 过滤指定标签等级日志 : 使用 `adb logcat WifiHW:D *:S` 命令进行过滤;

-- 命令含义 : 输出标签为`WifiHW`并且优先级Debug(调试)等级以上的级别的日志;

-- 注意 `*:S` : 如果没有 `*S` 就会输出错误;

* 可以同时设置多个过滤器 : 使用`adb logcat WifiHW:D dalvikvm:I *:S` 命令, 输出 `WifiHW` 标签 的 Debug 以上级别 和` dalvikvm`标签的 Info 以上级别的日志;

### 使用管道过滤日志

#### 过滤固定字符串

过滤固定字符串 : 只要命令行出现的日志都可以过滤, 不管是不是标签;

-- 命令 : `adb logcat | grep Wifi` ;

```
octopus@octopus:~$ adb logcat | grep Wifi  
E/WifiHW  (  441): wifi_send_command : AP_SCAN 1 ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : SCAN_RESULTS ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : SCAN ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : AP_SCAN 1 ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : SCAN_RESULTS ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : AP_SCAN 1 ; interface index=0;  
E/WifiHW  (  441): wifi_send_command : SCAN_RESULTS ; interface index=0;  
```

过滤字符串忽略大小写 : `adb logcat | grep -i wifi` ;

#### 使用正则表达式匹配

```
V/ActivityManager(  574): getTasks: max=1, flags=0, receiver=null
```

分析日志 : 该日志开头两个字符是 `V/`, 后面开始就是标签, 写一个正则表达式 `^..ActivityManager`, 就可以匹配日志中的 `V/ActivityManager` 字符串;

正则表达式过滤日志: 使用上面的正则表达式组成命令 `adb logcat | grep "^..Activity"` ;

### 相关链接

[adb logcat 命令行用法](http://blog.csdn.net/tumuzhuanjia/article/details/39555445)