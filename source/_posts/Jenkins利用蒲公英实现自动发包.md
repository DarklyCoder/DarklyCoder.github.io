
title: Jenkins利用蒲公英实现自动发包
date: 2016-6-24 16:40:00
categories:
    - 开发技巧
tags:
    - Jenkins
    - 自动发包
---

[蒲公英](https://www.pgyer.com/)是一个应用内侧平台，我一般打完测试包后就会上传到该平台上让同事测试，为了使整个过程自动化，我结合了Jenkins配合python脚本实现了这一过程。
<!-- more -->


### 搭建步骤

* 配置好Jenkins环境；

* 创建并配置好项目的Job；

* 在Job的设置界面点击 **增加构建步骤** ，选择 **Execute Python script** ，没有的话请安装Jenkins的Python插件；

* 写入以下脚本：
```
    import requests
    
    # 上传到蒲公英
    def upload_file(file_name, src_path):
        url_post = 'http://www.pgyer.com/apiv1/app/upload'
        files = {
            'file': (file_name, open(src_path, 'rb'), 'application/octet-stream')
        }
        params = {
            'uKey': '***',
            '_api_key': '***'
        }
        result = requests.post(url=url_post, data=params, files=files).text
        print result
```
* 修改脚本中对应的东西，处理上传完成后的结果； 