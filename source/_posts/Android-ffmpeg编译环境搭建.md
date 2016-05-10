title: Android-ffmpeg编译环境搭建
date: 2016-05-10 17:05:20
categories: 
    - Android
tags: 
    - Android 
    - ffmpeg编译
---

之前都是在Mac下编译ffmpeg，今天在网上搜索一番，尝试在window7下编译ffmpeg。

<!-- more -->

#### 步骤:

1. 安装[Visual Studio 2015](https://www.visualstudio.com/)

2. 下载配置[android NDK](http://developer.android.com/tools/sdk/ndk/index.html);

3. 下载[ffmpeg](https://www.ffmpeg.org/)源码并解压;后面执行编译时可能会出现:`*** missing separator. Stop`,你可以先`git config --global core.autocrlf false`,然后重新`clone`.

4. 下载[MinGW](http://www.mingw.org/)安装器;下载完成后安装，安装完成后点运行，标记上以下几项：
   <div align=center>
	<img src="http://img.blog.csdn.net/20140827212847608?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZmluZXdpbmQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center">
   </div>
   然后在Installation菜单下点击Apply Changes（mingw32-gcc-g++不用选择；
   
5. 下载[yasm](http://yasm.tortall.net/);下载后改名为`yasm.exe`，复制到MinGW的`/msys/1.0/bin`目录下；

6. 配置`MinGW/msys/1.0/msys.bat`文件，在此文件的最前面(@echo off之后)添加一行如下内容：

        call "D:\Program Files(x86)\Microsoft Visual Studio 14.0\VC\bin\vcvars32.bat" //依实际安装路径修改路径
        
7. 重命名`MinGW/msys/1.0/bin/link.exe`为`link_renamed.exe`，这一步是防止这个link.exe与vc的link.exe发生冲突，编译完成后可修改回来；

8. 在ffmpeg源码目录下新建一个`build_android.sh`脚本，并输入如下内容：

        NDK=D:/android_develop/android-ndk-r10e
        SYSROOT=$NDK/platforms/android-21/arch-arm/
        TOOLCHAIN=$NDK/toolchains/arm-linux-androideabi-4.9/prebuilt/windows-x86_64
        CPU=arm
        PREFIX=$(pwd)/android/$CPU 
        ADDI_CFLAGS="-marm"

        function build_one
        {
        ./configure \
            --prefix=$PREFIX \
            --enable-shared \
            --disable-static \
            --disable-doc \
            --disable-ffmpeg \
            --disable-ffplay \
            --disable-ffprobe \
            --disable-ffserver \
            --disable-avdevice \
            --disable-doc \
            --disable-symver \
            --cross-prefix=$TOOLCHAIN/bin/arm-linux-androideabi- \
            --target-os=linux \
            --arch=arm \
            --enable-cross-compile \
            --sysroot=$SYSROOT \
            --extra-cflags="-Os -fpic $ADDI_CFLAGS" \
            --extra-ldflags="$ADDI_LDFLAGS" 
        make clean
        make
        make install
        }
        build_one

9. 双击`MinGW/msys/1.0/msys.bat`，进入类linux shell界面，然后跳转到ffmpeg源码目录下`cd E:/android/ffmpeg/`;先用`chmod +x build_android.sh`给`build_android.sh`增加执行权限,再输入`build_android.sh`,然后坐等ffmpeg编译完成.