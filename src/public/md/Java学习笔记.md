[TOC]
# Java基础笔记
## 第一个 HelloWorld 程序
__新建 HelloWorld.java 文件：__ class 名必须与所在的 .java 文件名完全一致，class 是 java 中所有源代码的基本组织单位

```java
public class HelloWorld {
    // 这行代码是万年不变的固定写法，代表main方法，程序执行的起点
    public static void main(String[] args) {
      	// 打印输出的显示语句
        System.out.println("Hello,World!");
    }
}
```
__编译 .class：__ 在同路径下生成一个 .class 文件
```shell
$ javac HelloWorld.java 
```
__运行 .class：__ 运行 HelloWorld.class 文件
```shell
$ java HelloWorld
```
![HelloWorld](https://i.loli.net/2019/06/10/5cfe736c1914074988.png "HelloWorld")

## 标识符

* __标识符__：指在程序中，我们自定义的内容，比如 class 名
* __命名规则__：==硬性要求==
  1. 标识符可以包含 a-z==区分大小写==、0~9==数字==、$==美元符==、和 _==下划线==不能
  2. 以数字开头
  3. 不能是关键字，public、class、 ...
* __命名规范__：==软性建议==
  1. class：首字母大写==大驼峰式==
  2. 变量名：首字母小写==小驼峰式==
  3. 方法名：同变量名

## 常量 
|    类别    |                             解释                             |
| :-------- | :---------------------------------------------------------- |
| 字符串常量 | 双引号引起来的部分                                            |
|  整数常量  | 数字，没有小数位                                             |
| 浮点数常量 | 数字，有小数位                                               |
|  字符常量  | 单引号引起来的单个字符，==两个单引号中间必须有且仅有一个字符== |
|  布尔常量  | true、false                                                  |
|   空常量   | null ==不能直接用来打印输出==                                |

## 基本数据类型

| 四类   | 八种                                        | 字节数 | 数据表示范围                |
| :----- | :------------------------------------------ | :----- | :-------------------------- |
| 整型   | byte                                        | 1      | -128～127                   |
|        | short                                       | 2      | -32768～32767               |
|        | int（默认）                                 | 4      | -2147483648～2147483648     |
|        | long==定义long类型的时候要加L或l，建议L==   | 8      | -2^63^～2^63^-1             |
| 浮点型 | float==定义float类型的时候要加F或f，建议F== | 4      | -3.403E38～3.403E38         |
|        | double（默认）                              | 8      | -1.796E308～1.796E308       |
| 字符型 | chart                                       | 2      | 表示一个字符，如（'a','A'） |
| 布尔型 | boolean                                     | 1      | true、false                 |

## 变量

* __创建变量：__
  1. 没有赋值的变量不能直接打印输出
  2. 右侧的数值不能超过左侧数据类型的取值范围
  3. float和long类型，字母后缀必须要
  4. 变量使用不能超过作用域范围

```java
long num3 = 400000000L;
float num4 = 2.5F;
```

## 数据类型转换

* __自动类型转换 ==隐式==__:
  1. __特点__：代码不需要进行特殊处理，自动完成
  2. __规则__：数值范围从小到大
* __强制类型转换 ==显式==__:
  1. __特点__：代码要进行特殊格式处理，不能自动完成
  2. __格式__：范围小的类型 范围小的变量名 = (范围小的类型)比原本范围大的数据

```java
// 左边long类型，右边是默认的int类型，左右不一样
// int --> long，符合了数据范围从小到大的要求，这一行代码发生了自动类型转换
long num1 = 100;
System.out.println(num1); // int类型
// long --> float，数据范围是float大一些,不符合数据范围从小到大，需要进行格式处理
long num2 = (long)30F;
System.out.println(num2);
/* 
对于byte/short/char三种类型来说，如果右侧赋值的数值没超过范围，那么javac编译器会自动隐含地为我们补上一个(byte)(short)(char)
1. 如果没有超过左侧范围，编译器补上强转
2. 如果右侧超过了左侧范围，那么直接编译报错
*/
char str1 = /*(char)*/ 65;
System.out.println(str1); // A
/*
再给常量进行赋值的时候，如果右侧全是常量，没有变量，那么编译器javac将会直接将若干个常量表达式计算得到结果
*/
```

## ASCII编码表ASCII

* __数字和字符的对照关系表（编码表）__
> __ASCII码表__：American Standard Code for Information Interchange，美国信息互换标准代码
>
> __UNICODE码表__：统一码、万国码、单一码，为了解决传统的字符编码方案的局限而产生的
>
> ==48 - '0'==；==97 - 'a'==；==65 - 'A'==；

```java
char str2 = 'A'; // 其实保存的是65数字
int num = str2; // char --> int，发生自动类型转换
System.out.println(num);
```

## 运算符

* __算数运算符：__ +、-、*、/、%、++、--
* __赋值运算符：__ =、+=、-=、*=、/=、%=
* __比较运算符：__ ==、<、>、<=、>=、!=
* __逻辑运算符：__ &&、 || ==&&、|| 具有短路效果，节省一定的性能== 、&、|、^ ==相同则true，不同则false==、! 
* __三目符：__ 条件 ? 成立表达式 : 不成立表达式;
> __&和&&的区别：__ 单&时，左边无论真假，右边都会进行运算，没有短路效果
>
> __|和||的区别：__ 同上


## 方法

* __定义格式：__
   1. 方法名命名规则和变量一样
   2. 方法定义的先后顺序无所谓
   3. 方法的定义不能产生嵌套包含关系

```java
修饰符 返回类型 方法名 (参数类型 参数名,...) {
  方法体
  return 返回值;
}
// 如果方法的参数是基本数据类型：形参的改变不影响实参
// 如果方法的参数是引用数据类型：行参的改变会直接影响实际参数
```

* __解释：__
   1. __修饰符：__ public static
   2. __返回值类型：__ 用于限定返回值的数据类型；==没有返回值时需要用 void 声明==
   3. __方法名：__ 为我们定义的方法起名，满足标识符的规范
* __方法重载：__ ==在同一个类中，出现了方法名相同的情况，与返回值无关==
   1. __特点：__ 方法名相同，参数列表不同 ==参数个数不同 || 参数对应的数据类型不同==
## Jshell

__需要jdk9__

```shell
$ jshell
| 欢迎使用jshell
| 要大致了解该版本，请键入：/help intro
jshell> System.out.println("Hello World!");
Hello World!
jshell> int a = 6;
a ==> 6
jshell> /exit
| 再见
```

## 流程控制

__概述：__==根据编写的顺序从上到下运行==

在一个程序执行过程中，各条语句的执行顺序对程序的结果是有直接影响的，也就是说，程序的流程对运行结果有直接的影响，所以，我们必须清楚每条语句的执行流程，并实现通过控制语句的执行顺序来实现我们要完成的功能。

### 判断语句

* __if…else if…else__
* __三目运算符__

### 选择语句
* __switch…case__ ==从匹配到的第一个case开始向下执行，直至break==

1. switch监测值只能是以下几种类型：
   1. 基本数据类型：==byte==、==short==、==char==、==int==
      1. JDK5以后可以是枚举
      2. JDK7以后可以是字符串
   2. 引用数据类型：==String==、==enum枚举==

### 循环语句

* __for循环__
* __while__
* __do...while__ ==先执行一次==

### 跳出语句

1. __break__ ==结束循环==
2. __continue__ ==跳过这次循环==

## 键盘录入

> __为了提高程序的灵活性，我们就叭数据改进为键盘录入__ ==使用 JDK 提供的类 Scanner==

* __使用步骤：__
  1. __导包__ ==在一个类中的顺序：package > import > class==
     1. import java.util.Scanner;
  2. __创建键盘映入对象__
     1. Scanner sc = new Scanner(System.in);
  3. __接收数据__
     1. int i = sc.nextInt();

```java
import java.util.Scanner;
public class ScannerDemo {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入第一个数据");
        int num1 = sc.nextInt();
        System.out.println("请输入第二个数据");
        int num2 = sc.nextInt();
        System.out.println(num1 + num2);
    }
}
```



## 随机数(Random)

* __使用步骤：__
  1. __导包__
     1. import java.util.Random;
  2. __创建对象__
     1. Random r = new Random();
  3. __获取随机数__
     1. int num = r.nextInt(10); ==产生的数在0～10之间，包括0，不包括10==

```java
/* 猜数字案例 */
import java.util.Random;
import java.util.Scanner;
...
Random r = new Random();
int num1 = r.nextInt(100) + 1; // [1,100]
System.out.println("random:"+num1);
Scanner sc = new Scanner(System.in);
while (true){
  System.out.println("请输入数据");
  int num2 = sc.nextInt();
  if (num1 > num2){
 	 	System.out.println("猜小了");
  }else if (num1 < num2){
  	System.out.println("猜大了");
  }else {
  	System.out.println("猜对了");
  	break;
  }
}
...
```

## String类基本功能

> Object：是类层次结构中的根类，所有的类都都继承自该类，如果一个方法的形式参数是Object，那么这里我们就可以传递他的任意子类对象

* __判断：__
  1. __boolean equals(Object obj)__：比较字符串的内容是否相同
  2. __boolean equalsIgnoreCase(String str)：__ 比较字符串内容是否相同，忽略大小写
  3. __boolean startsWith(String str)：__ 判断字符串对象是否以指定的str开头
  4. __boolean endsWith(String str)：__ 判断字符串对象是否以指定的str结尾

```java
// 登录示例：
String userName = "admin";
String passWord = "123456";
int i = 3;
Scanner sc = new Scanner(System.in);
while (true){
  if(i==0){
    break;
  }
  System.out.println("请输入用户名(还有"+i+"次机会)：");
  String name = sc.nextLine();
  System.out.println("请输入密码：");
  String psw = sc.nextLine();
  if (userName.equals(name)) {
    if (passWord.equals(psw)) {
      System.out.println("登陆成功");
      break;
    }else {
      System.out.println("密码错误");
    }
  }else {
    System.out.println("用户名不存在");
  }
  i--;
}
```

* __获取：__
  1. __int length()：__ 获取字符串长度
  2. __char charAt(int index)：__ 获取指定索引的字符
  3. __int indexOf(String str)：__ 获取str在字符对象中第一次出现的索引,不存在则为 -1
  4. __String substring(int start)：__ 从start处开始截取字符串
  5. __String substring(int start,int end)：__ 截取索引为start至索引end之间的字符 ==包括start，不包括end==

```java
/*
 * 如何判断字符是大写、小写字母、数字字符：
 * 假如 ch 是一个字符
 * 大写：ch >= 'A' && ch <= 'Z'
 * 小写：ch >= 'a' && ch <= 'z'
 * 数字：ch >= '0' && ch <= '9'
 */
Scanner sc = new Scanner(System.in);
int A = 0,a = 0,n = 0;
System.out.println("请输入一个字符串：");
String str = sc.nextLine();
for (int i = 0;i<str.length();i++){
  char c = str.charAt(i);
  if (c >= 'A' && c <= 'Z'){
    A++;
  }else if (c >= 'a' && c <= 'z'){
    a++;
  }else if (c >= '0' && c <= '9'){
    n++;
  }else{
    System.out.println("非法字符:"+c);
  }
}
System.out.println("大写字母:"+A);
System.out.println("小写字母:"+a);
System.out.println("数字:"+n);
```

* __转换：__

  1. __char[] toCharArray()：__ 把字符串转换为字符数组
  2. __String toLowerCase()：__ 把字符串转换为小写字符串
  3. __String toUpperCase()：__ 把字符串转换为大写字符串
  4. __String trim()：__ 去除字符两端的空格
  5. __String[] split(String str)：__ 按照指定符号分割字符串
  ```java
  String str = "abcde";
  char[] chs = str.toCharArray();
  for (char i : chs) {
      System.out.println(i); // a、b、c、d、e
  }
  ```

## StringBuilder

* __构造方法： StringBuilder()__  ==初始容量为16个字符==
* __成员方法：__
  1. __public int capacity()：__ 返回当前容量 ==理论值==
  2. __public int length()：__ 返回长度(字符) ==实际值==
* __常用方法：__
  1. __添加：__ public StringBuilder append(任意类型)
  2. __反转：__ public StringBuilder reverse()
  3. __转String：__ public StringBuilder toString()
  4. __String转StringBuilder：__ StringBuilder(String str) 

```java
StringBuilder stringBuilder = new StringBuilder();
stringBuilder.append("Monako").append("poi");
System.out.println("反转："+stringBuilder.reverse()); // 反转：iopokanoM
System.out.println("再反转："+stringBuilder.reverse().reverse()); // 反转：Monakopoi
```

## 数组

* __定义格式：__
  1. 数据类型[] 数组名;（推荐）
  2. 数据类型 数组名[];

```java
int[] arr; // 定义了一个int类型的数组，数组名是arr
int arr[]; // 定义了一个int类型的变量，变量名是arr数组 
```

* __初始化：__

  1. 动态 ==只提供长度，由系统给出初始化值==

     ```java
     // 数据类型[] 数组名 = new 数据类型[数组长度];
     int[] numArray = new int[10];
     /*
     左边：int：数组中元素是int类型
          []：数组
          arr：数组名称
     右边：new：为数组申请内存分配，开辟空间
          int：数组中元素是int类型
          []：数组
          10：数组长度
     */
     for (int i : numArray) {
       System.out.println(numArray[i]);
     }
     ```

     

  2. 静态 ==给出初始化值，由系统决定长度==

     ```java
     // 数据类型[] 数组名 = new 数据类型[]{元素1,元素2,...};
     // 简写：数据类型[] 数据名 = {元素1,元素2,...};
     int[] arr = {1,2,3};
     ```

## 二维数组

```java
/* 定义格式：
     数据类型[][] 数组名; (推荐)
     数据类型 数组名[][];
     数据类型[] 数组名[];
	 初始化：
     动态：数据类型[][] 数组名 = new 数据类型[m][n];
          m：一维数组元素个数
          n：二维数组元素个数
     静态：数据类型[][] 数组名 = new 数据类型[][]{{元素...},{元素...},...};
          简化：数据类型[][] 数组名 = {{元素...},{元素...},...}; */ 
int[][] arr2 = {{1,2,3},{3,32,5},{1,21}};
for (int i = 0;i < arr2.length; i++){
  for (int l = 0; l < arr2[i].length; l++){
    System.out.println("二维：" + arr2[i][l]);
  }
}
```



## java中的内存分配

1. __栈：__ 存储的是局部变量 ==使用完立即回收==
2. __堆：__ 存储的是new出来的东西^实体、对象^ ==使用完后，在垃圾回收器空闲的时候被回收==
3. __方法区：__ 
4. __本地方法区：__ 和系统相关
5. __寄存器：__ 给cpu用

## 集合类

==长度可变==

* ArrayList\<E\>： ==\<E\> 是一种特殊的数据类型，泛型==
  1. 大小可变数组的实现

> 使用：在出现\<E\>的地方使用引用类型替换即可
>
> 例：ArrayList\<String\>

* __构造方法：__ ArrayList()
* __添加元素：__ 
  1.  public boolean add(E e) ==添加元素==
  2.  public void add(int index,E element) ==在指定位置添加元素==