title: "@SmallTest-@MedimuTest-@LargeTest注解"
date: 2016-06-22 14:44:45
categories: 
	- 测试
tags: 
    - 注解 
---

### 作用：

指定测试用例所测试的范围，即测试代码中包含了哪些方面的内容。

### 使用场合：

* @SmallTest：测试代码中不与任何的文件系统或网络交互。
* @MediumTest：测试代码中访问测试用例运行时所在的设备的文件系统。
* @LargeTest：测试代码中访问外部的文件系统或网络。

### 使用领域：

|Feature|Small|Medium|Large|
|-------|-----|----|----|
|Network access|No|localhost only|Yes|
|Database|No|Yes|Yes|
|File system access|No|Yes|Yes|
|Use external systems|No|Discouraged|Yes|
|Multiple threads|No|Yes|Yes|
|Sleep statements|No|Yes|Yes|
|System properties|No|Yes|Yes|
|Time limit (seconds)|60|300|900+|
