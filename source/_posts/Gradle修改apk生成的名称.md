title: Gradle修改apk生成的名称
date: 2015-6-24 15:08:20
categories: 
	- 开发技巧
tags: 
    - 修改apk名称 
    - Gradle
---

使用gradle构建项目，每次打包名字都是app-release.apk，有时需要修改对应apk的名称，下面提供2种方法:

<!-- more -->


* 在app的module里的`build.gradle`文件中，在`android { ...}`里面加上这样一段代码，即可修改生成的apk的文件名。

        android.applicationVariants.all { variant ->  
            def file = variant.outputFile  
            variant.outputFile = new File(file.parent, file.name.replace(".apk", "-" + defaultConfig.versionName + ".apk"))  
        }  

    *如果提示`Could not find property 'outputFile' on com.android.build.gradle.internal.api...`，是因为gradle改版，把 `variant.outputFile`改成`variant.outputs[0].outputFile`即可。
       

* 在`build.gradle`文件中加入以下代码

        build.doLast {  
                def today = new Date().format('yyyyMMdd');  
                copy{  
                    from('build/outputs/apk')  
                    into('/Users/apple/Desktop/')  
                    include('app-release.apk')  
                    rename('app-release.apk','Test' + "_"+ today + '.apk')  
                }  
            }  