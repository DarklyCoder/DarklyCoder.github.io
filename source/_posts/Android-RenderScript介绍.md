title: Android_RenderScript介绍
date: 2016-05-09 11:23:30
categories: 
    - Android
tags: 
    - Android 
    - RenderScript
---

[RenderScript的首页](http://developer.android.com/guide/topics/renderscript/index.html)

[关于图形方面的知识](http://developer.android.com/guide/topics/renderscript/graphics.html)

[关于计算方面的知识](http://developer.android.com/guide/topics/renderscript/compute.html)


### 什么是RenderScript？

　　RenderScript是Android平台上进行高性能密集型任务计算的框架。Renderscript主要面向并行计算，虽然它对计算密集型工作也是有益的。Renderscript在运行时将在设备上可用的处理器间平衡负载，比如多核CPU，GPU或者DSP，它让你专注于算法而不是平衡负载。RenderScript对图像处理，计算摄影学，计算机视觉方面的应用非常有用。
<!-- more -->
　　在开始学习Renderscript前，你应该理解两个主要概念：

* 高性能的计算核心由支持C99协议的语言书写（也就是C语言。译者注）。
* 一套Java API 用来管理RenderScript资源，并控制核心计算的执行。

#### 写RenderScript内核
---
　　一个RenderScript内核一般写在[工程目录]/src/ 目录下的`.rs`文件中，每一个`. rs`文件成为一个脚本。每一个脚本包含一系列的内核、函数、变量。通常包含:

* 一个编译声明RenderScript内核语言的版本(#pragma version(1))。目前可用值只有1。
* 一个编译声明这个脚本对应的java类的包名(#pragma rs java_package_name(com.example.app))。注意你的`.rs`文件必须放在你的Application里面，不能放在library project里。
* 一些可调用的函数。一个可调用的函数是一个单线程的RenderScript函数，你可以从Java代码中调用它并传递变量。它通常用在处理管道里初始化设置或者一系列较大的计算。
* 一些全局变量。一个Renderscript全局变量等价于C语言中的一个全局变量。你可以从Java代码中访问，它们通常被用来向RenderScript内核传递参数。
* 一些计算核心。一个计算核心是在Allocation里的Element间执行的平行函数。
    一个简单的核心如下：

        uchar4 __attribute__((kernel)) invert(uchar4 in, uint32_t x, uint32_t y) {
          uchar4 out = in;
          out.r = 255 - in.r;
          out.g = 255 - in.g;
          out.b = 255 - in.b;
          return out;
        }

　　它在很多方面跟标准C函数一致。第一个值得注意的是`__attribute__((kernel))`, 这表明这个函数式RenderScript内核而不是可调用函数。第二个特性是`in`参数和它的类型，在RenderScript内核里第一个参数会根据传入内核平台的Allocation被自动填入。默认的，内核将在每一个Element执行一次时在整个Allocation中运行。第三个注意点是内核的返回类型，这个返回值将被自动的写入到输出Allocation的适当的位置。RenderScript会在运行时确保输入和输出的Allocation的Element类型互相匹配；如果不匹配，会抛出异常。

　　一个核心可能有一个输入Allocation或一个输出Allocation。也可能有多个输入输出Allocation。如果需要多个输入输出Allocation，这些对象应该同`rs_allocations`脚本全局变量绑定，并且通过`rsGetElementAt_type()`或者`rsSetElementAt_type()` 在内核或可调用函数中访问。

　　一个核心可以使用`x`、`y`和`z`参数来访问当前执行的坐标。这些参数是可选的，但是类型必须是`uint32_t`。

* 可选的`init()`函数。`init()`函数是一个特殊的可调用函数，它在脚本初始化时执行。这样可以在脚本创建时自动进行一些计算。
* 一些静态全局变量和函数。静态的全局变量与普通的全局变量不同的地方是它不能在Java代码中设定。静态函数是一个标准的C函数，可以在内核和脚本中的可调用方法中调用，但是不能被Java API访问。如果全局变量或者函数不需要在Java代码中使用，强烈建议声明成`static`。

#### 设置浮点精度

　　你可以在脚本里控制浮点数的精度。这样做在不要求使用IEEE 754-2008 标准（默认使用）时是很有用的。下面的编译指示可以设置不同的浮点精度：

* `#pragma rs_fp_full` (不指定时默认的设置)：使用IEEE 754-2008 标准的精度。
* `#pragma rs_fp_relaxed` 不严格的使用IEEE 754-2008 的标准，允许少量的精度误差。
* `#pragma rs_fp_imprecise` 不需要严格的精度要求，允许`#pragma rs_fp_relaxed`下的所有情况，还包括：
    - Operations resulting in -0.0 can return +0.0 instead.
    - Operations on INF and NAN are undefined.

Most applications can use `rs_fp_relaxed` without any side effects. This may be very beneficial on some architectures due to additional optimizations only available with relaxed precision (such as SIMD CPU instructions).

#### 访问Renderscript API
---
　　在Android应用里使用RenderScript的API有两种方式
* `android.renderscript` 这个包在运行Android3.0(API level 11)的设备上可用，这是原始的API，目前没有被更新。
* `android.support.v8.renderscript` 这个包可以通过共享库在运行Android2.2(API level 8)或以上版本的设备上使用。
强烈建议使用第二种方式，因为它包含了最新的更新，并且支持更多的设备。

#### 使用RenderScript共享库API

　　为了使用共享库的RenderScript API，你需要安装你的开发环境。你需要下面的SDK工具：
* Android SDK Tools revision 22.2 or higher
* Android SDK Build-tools revision 18.1.0 or higher

使用RenderScript APIs：

1. 安装需要的SDK和编译工具
2. 在build.gradle中修改RenderScript的设置
    - 打开当前模块的build.gradle文件.
    - 对照下面代码添加RenderScript设置:
    
            android {
                compileSdkVersion 23
                buildToolsVersion "23.0.3"

                defaultConfig {
                    minSdkVersion 8
                    targetSdkVersion 19

                    renderscriptTargetApi 18
                    renderscriptSupportModeEnabled true
                }
            }

3. 在类中导入共享库的类

	    import android.support.v8.renderscript.*;


#### 在Java代码中使用RenderScript
---
　　在Java代码中使用RenderScript依赖`android.renderscript`或`android.support.v8.renderscript`中的API。大部分程序遵循如下的使用方式：

1. **初始化RenderScript context。**`RenderScript` context通过`create(Context)`创建，它能保证RenderScript能被使用，并且提供了一个对象来控制所有后面创建的RenderScript对象的生命周期。创建这个context可能是一个耗时的操作，因为可能要在硬件的不同位置创建资源;通常，一个程序同时只能有一个RenderScript context。

2. **创建至少一个Allocation来传递给脚本。**一个`Allocation`是一个RenderScript的对象，它存储了固定数量的数据。脚本里的内核将Allocation对象作为输入和输出，内核可以在绑定脚本全局变量时通过`rsGetElementAt_type()`和`rsSetElementType_type()`来访问Allocation对象。Allocation对象可以通过数组从java代码传递给Renderscript代码，反之亦然。Allocation对象通常用`createTyped(RenderScript, Type)`或`createFromBitmap(RenderScript, Bitmap)`创建。

3. **创建你所需的任何脚本。**有两种脚本可被创建：
    * **ScriptC**：这是上面`写RenderScript内核`部分介绍的用户自定义脚本。RenderScript编译器会为每一个脚本创建一个java类，可以方便从java代码中访问脚本；这个类会被命名成ScriptC_filename。比如：如果上面的核心位于`inver.rs`中，并且一个RenderScript context已经被创建，在java代码中初始化脚本的代码如下：
    
            ScriptC_invert invert = new ScriptC_invert(mRenderScript);

    * **ScriptIntrinsic**：这是嵌入在RenderScript内核中的通用操作，比如高斯模糊、卷积、图像混合。更多信息请参看 [ScriptInstrinsic](http://developer.android.com/intl/zh-cn/reference/android/renderscript/ScriptIntrinsic.html)。

4. **填充Allocation中的数据。**除了`android.renderscript`创建的Allocation以外，一个空的Allocation将被创建，填充一个Allocation，请使用Allocation的`copy`方法。

5. **设置必要的脚步全局变量。**全局变量可以使用`ScriptC_filename`里的`set_globalname`来设置。例如,要想设置一个叫`elements`的整形变量，使用java方法`set_elements(int)`。RenderScript对象也可以在核心中设置，例如，叫做`lookup`的`rs_allocation`变量可以通过`set_lookup(Allocation)`函数设置。

6. **加载适当的核心。**使用ScriptC_filename中的forEach_kernelname()函数可以加载一个核心。加载过程是异步的，加载的顺序和启动的顺序是一致的。根据传入内核的参数的不同，这个函数会携带一个或两个Allocation。默认的，一个核心会在整个输入输出Allocation中执行；为了在一系列Allocation中执行，给forEach函数的最后一个参数传递恰当的`Script.LaunchOptions`。可调用函数可以使用`ScriptC_filename`中的`invoke_functionname`调用。

7. **从Allocation对象中拷贝数据。**为了在java代码中访问Allocation中的数据，需要使用Allocation的copy方法拷贝到java缓冲区中。这些方法会必要的时候在异步内核和函数调用间做同步。

8. **销毁RenderScript context。**可以使用`destroy()`方法销毁RenderScript context，或者允许RenderScript context对象被垃圾回收。这样使用这个context中的任何对象将抛出异常。

----

