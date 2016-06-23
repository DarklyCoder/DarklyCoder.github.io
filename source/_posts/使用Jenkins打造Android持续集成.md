
title: 使用Jenkins打造Android持续集成
date: 2016-6-23 10:00:00
categories:
    - 持续集成
tags:
    - 持续集成
    - CI
    - Jenkins
---

### 什么是Jenkins

 [Jenkins](https://jenkins.io/index.html)是一个开源项目，提供了一种易于使用的持续集成系统，使开发者从繁杂的集成中解脱出来，专注于更为重要的业务逻辑实现上。同时`Jenkins`能实施监控集成中存在的错误，提供详细的日志文件和提醒功能，还能用图表的形式形象地展示项目构建的趋势和稳定性。`Jenkins`的前身是`Hudson`是一个可扩展的持续集成引擎。

<!-- more -->

### 搭建Jenkins环境 

在官网[下载war包](https://jenkins.io/index.html)，放在tomcat的`webapps`目录下，开启tomcat，访问localhost:8080/jenkins进入。

### 下载Jenkins插件

打开 **系统管理** -> **管理插件** -> **可选插件**，在右上角搜索框输入插件名称。

如：下载Gradle插件、svn插件、git插件等

安装慢的话，可以把插件下载下来，在 **高级** 里手动上传插件或设置代理。

### Jenkins新建任务

 回到Jenkins主界面，点击 **新建**，输入任务名称，选中 **构建一个自由风格的软件项目** ，点击`OK`跳到设置页面

### Job设置

设置当前Job的相关信息，设置完成后记得保存。

#### 源码管理

设置源码的Repository地址，可以使用CVS/SVN/GIT等方式，这里以SVN为例:

* 勾选`Subversion`，在`Repository URL`填写项目地址（具体的）；
* 如果输入的地址需要输入用户名和密码，将自动跳出红色的提示信息,设置`Credentials`,添加SVN的账号和密码；

#### 构建触发器

* Build periodically：周期性构建
* Poll SCM：周期性扫描远程repository，当有变化时进行构建

使用格式：`MINUTE HOUR DOM MONTH DOW`，每个字段以`TAB`分割。

|FIELD|DESC|
|-----|----|
|MINUTE |	表示一小时内多少分钟（0-59）  |
|HOUR	|   表示一天内多少小时（0-23）  |
|DOM	|   表示一个月内多少天（1-31）  |
|MONTH	|   表示每月（1-12）  |
|DOW	|   表示星期几（0-7），其中0和7都表示周日   |

如果要指定一个字段允许多个值，就按下面提供的操作步骤，优先顺序如下：

* `*` 可用来指定所有有效的值
* `M-N` 可以用来指定一个范围,比如“1-5”
* `M-N/X`或`*/X` 可用于在指定范围内跳跃一个X的值，比如在MINUTE字段中"*/15"表示"0,15,30,45"，"1-6/2"表示"1,3,5"。
* `A,B,...,Z` 可以用来指定多个值，比如“0,30”或“1,3,5”。

任何空行或者以`#`开头的行会被当作注释忽略

此外，`@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily`, `@midnight`, `@hourly`都是支持的 。

|Example|desc|
|----|----|
| H/15 * * * *          | 每隔15分钟触发(perhaps at :07, :22, :37, :52)|
| H(0-29)/10 * * * *    | 在每前半个小时内每隔10分钟触发(three times, perhaps at :04, :14, :24)|
| 45 9-16/2 * * 1       | 每周在9:45和16:45之间每隔2小时触发|
| H H(9-16)/2 * * 1-5   | 每周在9和16之间每隔2小时触发(perhaps at 10:38 AM, 12:38 PM, 2:38 PM, 4:38 PM)|
| H H 1,15 1-11 *       | 除12月外，每个月在1号或者15号触发|

####  构建

* 点击 **增加构建步骤** 添加`Invoke Gradle script`，如果没有这个选项，请安装Jenkins的Gradle插件；

* 设置`Switches`：填写`clean build`,相当于执行gradle clean build命令。

#### 运行

进入Job界面，点击左侧的 **立即构建**，一段时间后你就可以看到构建后的效果了。


### 相关链接

[Jenkins持续集成](http://www.cnblogs.com/zz0412/tag/jenkins/)
