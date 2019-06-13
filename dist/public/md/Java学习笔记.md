[TOC]
## 第一个java程序

### 新建 HelloWorld.java 文件

> class 名必须与所在的 .java 文件名完全一致。

> class 是 java 中所有源代码的基本组织单位。
```java
public class HelloWorld {
    // 这行代码是万年不变的固定写法，代表main方法，程序执行的起点
    public static void main(String[] args) {
      	// 打印输出的显示语句
        System.out.println("Hello,World!");
    }
}
```
### 编译 .class

+ 在同路径下生成一个 .class 文件
```shell
$ javac HelloWorld.java 
```
### 运行 .class

+ 运行 HelloWorld.class 文件
```shell
$ java HelloWorld
```
![HelloWorld](https://i.loli.net/2019/06/10/5cfe736c1914074988.png "HelloWorld")

___

## 标识符

* __标识符__：指在程序中，我们自定义的内容，比如 class 名

+ __命名规则__：<sup>硬性要求</sup>
  + 标识符可以包含 a-z<sup>区分大小写</sup>、0~9<sup>数字</sup>、$<sup>美元符</sup>、和 _<sup>下划线</sup>
  + 不能以数字开头
  + 不能是关键字，public、class、 ...

+ __命名规范__：<sup>软性建议</sup>
  + class：首字母大写<sup>大驼峰式</sup>
  + 变量名：首字母小写<sup>小驼峰式</sup>
  + 方法名：同变量名

___

## 常量<sup>运行期间，固定不变的量</sup>

### 常见的分类：

1. __字符串常量：__ 凡用双引号引起来的部分，叫字符串常量
2. __整数常量：__ 直接写数字，没有小数位，如：100，-100
3. __浮点数常量：__ 直接写数字，有小数位，如：1.2，-3.5
4. __字符常量：__ 凡用单引号引起来的单个字符，叫字符常量<sup>两个单引号中间必须有且仅有一个字符</sup>
5. __布尔常量：__ 只有量中取值，true、false
6. __空常量：__ null，空<sup>空常量不能直接用来打印输出</sup>

## 基本数据类型<sup>四类八种</sup>

| 四类   | 八种                                       | 字节数 | 数据表示范围                |
| :----- | :----------------------------------------- | :----- | :-------------------------- |
| 整型   | byte                                       | 1      | -128～127                   |
|        | short                                      | 2      | -32768～32767               |
|        | int（默认）                                | 4      | -2147483648～2147483648     |
|        | long<sup>定义long类型的时候要加L或l，建议L</sup>   | 8      | -2^63^～2^63^-1             |
| 浮点型 | float<sup>定义float类型的时候要加F或f，建议F</sup> | 4      | -3.403E38～3.403E38         |
|        | double（默认）                             | 8      | -1.796E308～1.796E308       |
| 字符型 | chart                                      | 2      | 表示一个字符，如（'a','A'） |
| 布尔型 | boolean                                    | 1      | true \|\| false             |

