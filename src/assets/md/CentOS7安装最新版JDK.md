[TOC]

# CentOS7安装最新版JDK

> 最新jdk下载地址： <https://www.oracle.com/technetwork/java/javase/downloads/index.html>
## 下载最新版JDK

```shell
wget https://download.oracle.com/otn-pub/java/jdk/13.0.2+8/d4173c853231432d94f001e99d882ca7/jdk-13.0.2_linux-x64_bin.tar.gz?AuthParam=1579488154_47404023dc58e870c55a920a501505d2
```

## 解压JDK压缩包

```shell
tar -zxvf jdk-13.0.2_linux-x64_bin.tar.gz?AuthParam=1579488154_47404023dc58e870c55a920a501505d2
```

## 移动解压的JDK文件夹到环境常用的目录

```shell
mv jdk-13.0.2 /usr/local/
```

## 配置JDK环境变量

```shell
vim /etc/profile
```

## 添加如下配置

```shell
#JDK1.8  
export JAVA_HOME=/usr/local/jdk-13.0.2
export JAVA_BIN=/usr/local/jdk-13.0.2/bin  
export PATH=$PATH:$JAVA_HOME/bin  
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar  
export JAVA_HOME JAVA_BIN PATH CLASSPATH
```

## 重新加载/etc/profile文件

```shell
source /etc/profile
```

## 验证是否安装成功

```shell
java -version
```

