title: windows下快速创建wifi热点
date: 2012-05-09 22:30:18
categories: 
    - 开发技巧
tags:
    - 创建wifi热点
---

### windows下快速创建wifi热点的方法:

打开DOS命令行窗口输入以下命令:

    netsh wlan set hostednetwork mode=allow|disallow //设置wifi模式

    netsh wlan set hostednetwork ssid=您想要的无线网络的名称 key=您想要设置的密码

    netsh wlan start hostednetwork //开启wifi

    netsh wlan stop hostednetwork //关闭wifi

