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
   1. __修饰符：__ public static ==静态==
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

## System

* __System：__ 包含一些有用的类字段和方法，它不能被实例化
  1. __static void arraycopy(Object src,int srcPos,Object dest, int length)__
  2. __static long currentTimeMillis()__ // 以毫秒值返回当前的系统时间
  3. __static void exit(int status)__ // 终止虚拟机
  4. __static void gc()__ // 运行垃圾回收器

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

## Map

* __添加：__ __V put(K key,V value)__
* __获取：__ 
  1. __V get(Object key)__
  2. __Int size()__
* __删除：__ 
  1. __void clean()__ ==清空所有==
  2. __V remove(Object key)__
* __判断：__ 
  1. __boolean containsKey(Object key)__ ==key是否存在==
  2. __boolean containsValue(Object value)__ ==value是否存在==
  3. __boolean isEmpty()__ ==判断是否有对应关系==
* __遍历：__
  1. __Set<Map.Entry<K,V>> entrySet()__
  2. __Set<K\> KeySet()__ ==返回所有key==
  3. __Collection<V\> values()__ ==返回value==

```java
Map<String,String> map = new HashMap<String, String>();
map.put("001","张三"); map.put("002","我三");
Set<String> sk = map.keySet();
for (String k: sk) { 
  System.out.println(map.get(k)); 
}
// 或
Set<Map.Entry<String,String>> ens = map.entrySet();
for (Map.Entry<String,String> ens: entrys){ 
  System.out.println(ens.getKey()+ens.getValue()); 
}
```

## 数组

* __定义格式：__
  1. 数据类型[] 数组名; ==推荐==
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

### ArrayList\<E\>

==长度可变==

* __ArrayList\<E\>__： ==\<E\> 是一种特殊的数据类型，泛型，大小可变数组的实现==

> 使用：在出现\<E\>的地方使用引用类型替换即可
>
> 例：ArrayList\<String\>

* __构造方法：__ ArrayList()
* __添加元素：__ 
  1.  public boolean add(E e) ==添加元素==
  2.  public void add(int index,E element) ==在指定位置添加元素== 
* __获取元素：__ public E get(int index) ==返回指定索引处的元素==
* __集合长度：__ public int size() ==返回集合中的元素个数==
* __移除元素：__ 
  1. public boolean remove(Object o) ==移除指定元素，返回移除是否成功==
  2. public E remove(int index) ==移除指定索引处的元素，返回移除的元素==
* __修改元素：__ public E set(int index,E element)
* __清空集合：__ void clear()
* __判断包含元素：__ boolean contains(Object o)
* __是否为空：__ boolean isEmpty()
* __转换为Object数组：__ Object[] toArray()

* __集合遍历：__ 1、toArray()     2、iterator() ==返回一个迭代器对象==

  ```java
  // Iterator: 对 collection 进行迭代的迭代器
  Collection al = new ArrayList();
  al.add("hello");
  al.add("java");
  Iterator s = al.iterator();
  // boolean hasNext() 判断是否有元素可以获取
  // E next(); 返回下一个元素
  while (s.hasNext()){
    System.out.println(s.next());
  }
  ```

### 并发修改异常

==Exception in thread "main" java.util.ConcurrentModificationException==

> 迭代器是依赖于集合的，相当于集合的一个副本，当迭代器在操作时，如果发现和集合不一样，则抛出异常
* __解决方法：__
  1. 别用了
  2. 使用迭代器遍历的时候使用迭代器进行修改 ==ListIterator==

```java
public class IteratorDemo {
    public static void main(String[] args) {
        // Collection collection = new ArrayList();
        // collection.add("Hello");
        // collection.add("world");
        // collection.add("java");
        // 获取集合的没哟个元素，比较
        // Iterator ls = collection.iterator();
        List  collection = new ArrayList();
        collection.add("Hello");
        collection.add("world");
        collection.add("java");
        // 获取集合的没哟个元素，比较
        ListIterator ls = collection.listIterator();
        while (ls.hasNext()){
           if (ls.next().equals("java")){
               ls.add("android");
           }
        }
        System.out.println(collection.toString());
    }
}
```

## 泛型

* __好处：__
  1. 避免类型转换的问题
  2. 可以减少黄色警告线
  3. 可以简化代码书写

* __森么时候用呢？__ ==<E\>==

```java
public class GenericDemo {
    public static void main(String[] args) {
        Collection<Study> c = new ArrayList<Study>();
        Study study = new Study("张三",18);
        Study study1 = new Study("张三",18);
        c.add(study);
        c.add(study1);
        Iterator<Study> ls = c.iterator();
        while (ls.hasNext()){
            System.out.println(ls.next().name);
        }
    }
}
class Study{
    String name;
    int age;
    public Study(String name,int age){
        this.age = age;
        this.name = name;
    }
}
```

## HasSet<E\>

==存储自定义对象集合==

```java
Set<String> set = new HashSet<String>(); // 接口指向子类对象
// 添加元素对象
set.add("添加HasSet");
set.add("添加java");
for (String s:set) {
	System.out.println(s);
}
```

## Collections

==Collections和Collections的区别==

> __Collections：__ 是一个工具类，方法就是用于操作Collection
>
> __Collection：__ 集合体系的最顶层，包含了集合体系的共性

* __方法：__
  1. __static int binarySearch(List list,T key)：__ 使用二分查找法查找指定元素在指定列表的索引位置
  2. __static void fill(List list,Object obj)：__ 使用指定的元素填充指定列表的所有元素
  3. __static void copy(List list,Object key)：__ 把原列表中的数据覆盖到目标列表去 ==目标列表长度至少等于原列表长度==
  4. __static void reverse(List list)：__ 反转
  5. __static void shuffle(List list)：__ 随机置换
  6. __static void sort(List<E\> list)：__ 按照列表中元素的自然顺序进行排序
  7. __static void swap(list list,int i,int j)：__ 将指定列表中的两个索引进行位置互换
```java
List<String> list1 = new ArrayList<String>();
list1.add("SA");
list1.add("AA");
Collections.reverse(list1);
System.out.println(list1); // [AA, SA]
// static int binarySearch(List list,T key) 使用二分查找法查找指定元素在指定列表的索引位置
System.out.println(Collections.binarySearch(list1,"SA")); // 0
// static void fill(List list,Object obj) 使用指定的元素填充指定列表的所有元素
Collections.fill(list1,"撒");
System.out.println(list1); // [撒, 撒]
// static void copy(List list,Object key) 把原列表中的数据覆盖到目标列表去 ==目标列表长度至少等于原列表长度==
List<String> list = new ArrayList<String>();
list.add("");list.add("");
Collections.copy(list,list1);
System.out.println(list); // [撒, 撒]
```

## IO流

### File

* __构造方法：__
  1. __File(String pathname)：__ 将指定的文件路径转换成一个File对象
  2. __File(String parent,String child)：__ 根据指定的父路径和文件路径创建File对象
  3. __File(File parent,String child)：__ 根据指定的父路径对象和文件路径创建File对象

* __常用功能：__
  1. __创建：__ 
     1. __boolean createNewFile()__ ==创建文件==
     2. __boolean mkdir()__ ==创建一个文件夹==
     3. __boolean mkdirs()__ ==创建多个文件夹==
  2. __删除：__
     1. __boolean delete()__
  3. __获取：__
     1. __File getAbsoluteFile()__ ==绝对路径对象==
     2. __String getAbsoultePath()__ ==绝对路径字符串==
     3. __String getName()__ ==file对象的文件或目录名称==
     4. __String getParent()__ ==file对象的父目录路径名字符串，如果此路径名没指定父目录，则返回null==
     5. __String getPath()__ ==将此路径名转换为一个路径名字符串==
     6. __long lastmodified()__ ==最后修改时间==
     7. __long length()__ ==文件长度==
     8. __String[] list()__ ==文件夹下的文件和目录名==
     9. __File[] listFiles()__ 
     10. __static File[] listRoots()__ ==返回根列表==
  4. __判断：__
     1. __boolean exists()__ ==判断文件是否存在==
     2. __boolean isAbsolute()__ ==是否为绝对路径==
     3. __boolean idDirectory()__ ==是否是一个目录==
     4. __boolean isFile()__ ==是否是标准文件==
     5. __boolean isHidden()__ ==是否是隐藏文件==

### FileWriter

* __构造方法：__
  1. __FileWriter(String fileName)__
  2. __FileWriter(String fileName,boolean append)：__ ==追加写入，默认false==
* __成员方法：__ 
  1. __void writer(String str)：__ ==写入一个字符串数据==
  2. __void writer(String str, int index, int len)：__ ==写一个字符串中的一部分数据==
  3. __void writer(int ch)：__ ==写一个字符数据，这里int的好处是既能写char类型，又能写char对应的int类型的值==
  4. __void writer(char[] chs)：__ ==写一个字符数组数据==
  5. __void writer(char[] chs,int index,int len)：__ ==写一个字符数组数据的一部分数据==
  6. __void flush()：__ ==刷新缓冲区==
  7. __void close()：__ ==先刷新缓冲区，再释放资源==

```java
public static void main(String[] args) throws IOException {
  // 创建输出流
  FileWriter fw = new FileWriter("/Users/monako/Documents/test.txt",true);
  // 调用输出流写文件的方法
  fw.write("IO流你好"); // 数据没有直接写到文件中,其实是写到了内存缓冲区
  fw.write("\r\n"); // 换行
  // 刷新缓冲区
  fw.flush();
  char[] ch = {'A','B','D'};
  fw.write(ch,1,2);
  // 先刷新缓冲区，再释放资源
  fw.close();
}
```



### FileReader

* __构造方法：FileReader(String fileName)__ 
* __成员方法：__
  1. __int read()：__ ==读取一个字符==
  2. __int read(char[] cbuf)：__ ==一次读取一个字符数组的数据==

```java
public static void main(String[] args) throws IOException {
  // 读
  FileReader fr = new FileReader("/Users/monako/Desktop/IO流.txt");
  // int fread = fr.read();
  // System.out.println((char)fread); // I
  // int fread1 = fr.read();
  // System.out.println((char)fread1); // O
  // 如果读取数据返回值是-1时，就说明没有数据了
  int ds;
  while ( (ds=fr.read()) != -1 ){
    System.out.print((char) ds);
  }
  fr.close();
  FileReader fr = new FileReader("/Users/monako/Desktop/IO流.txt");
  // char[] c = new char[3];
  // int tss = frs.read(c);
  // System.out.println(new String(c));
  // int tss1 = frs.read(c);
  // System.out.println(new String(c));
  char[] c = new char[1024]; // 可以是1024及整数倍
  int tss;
  while ( (tss=frs.read(c)) != -1 ){
    // System.out.println(new String(c,0,tss));
    System.out.print(new String(c));
  }
  fr.close();
}
```

### BufferedWriter & BufferedReader

> __BufferedWriter：__ 将文本写入字符输出流，缓冲各个字符，从而提供单个字符、数组和字符串写入
>
> > __void newLine()：__ ==写一个换行符，由系统决定==
>
> __BufferedReader：__ 从字符输入流中读取文本，缓冲各个字符，从而实现字符数组和行的高效读取
>
> > __String readLine()：__ ==一次读取一行数据，不读取换行符==

```java
BufferedWriter bw = new BufferedWriter(new FileWriter("IO流.txt"));
bw.write("HAHA");
bw.close();
BufferedReader br = new BufferedReader(new FileReader("/Users/monako/Desktop/IO流.txt"));
char[] c = new char[1024]; // 可以是1024及整数倍
int tss;
while ( (tss=br.read(c)) != -1 ){
  System.out.println(new String(c,0,tss));
}
br.close();
```

### InputStream

==所有字节输入流的超类==

### BufferedInputStream

==InputStream的高效流==

### OutputStream

==所有字节输出流的超类==

### BufferedOutputStream

==OutputStream的高效流==

* __二进制文件只能使用字节流进行复制__

```java
// 创建字节输入流对象
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("/Users/monako/Pictures/0860758AC97CCA84FC129DD8791753CB.jpg"));
// 创建字节输出流对象
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("a.jpg"));
// 一次读写一个字节数组
int len; // 用于存储读到的字节数组
byte[] bys = new byte[1024];
while ((len=bis.read(bys))!=-1){
    bos.write(bys,0,len);
}
// 释放资源
bis.close();
bos.close();
```

### 标准输入、输出流

1. __public static final InputStream in__ 字节输入流，读取键盘录入数据
2. __public static final PrintStream out__ 字节输出流

### 打印流

==不能输出字节，可以输出其它任意类型==

1. __PrintStream__
2. __PrintWriter__ 

## 接口

==接口不能创建对象，不能实例化==

==类与接口的关系是实现关系，一个类实现一个接口，必须实现它的所有方法==

* __接口成员的特点：__ 

  1. __只能有抽象方法__ 

  > 默认使用 public & abstract 修饰方法
  >
  > 只能使用 public & abstract 修饰方法
  >
  > 默认使用 public static final 修饰成员变量

## 包

| 修饰符    | 类   | 成员变量 | 成员方法 | 构造方法 |
| --------- | ---- | -------- | -------- | -------- |
| public    | Y    | Y        | Y        | Y        |
| default   | Y    | Y        | Y        | Y        |
| protected |      | Y        | Y        | Y        |
| private   |      | Y        | Y        | Y        |
| abstract  | Y    |          | Y        |          |
| static    |      | Y        | Y        |          |
| final     | Y    | Y        | Y        |          |

> 常见规则：
>
> * 使用public来修饰类，一个java文件中只能有一个类，如果一个文件中有多个类，类名和文件名一样的类，必须使用public修饰，其他类不能使用public修饰
> * 所有的成员变量都使用private修饰
> * 所有的方法都使用public修饰
> * 所以的构造方法都使用public修饰
>   * 如果不想创建对象，使用private修饰

* __权限修饰符__
  1. public 当前类，相同包下不同的类，不同包下的类
  2. default 当前类，相同包下不同的类 ==相同包下使用==
  3. private 当前类 ==让子类对象使用==
  4. protected 当前类，相同包下不同的类

## 自动装箱&拆箱

==JDK1.5特性==

```java
// 自动装箱
// 相当于 Integer s = new Integer(20);
Integer s = 20;
Integer s1 = 30;
Integer s2 = s + s1;
// 自动拆箱
// 相当于 int a = s.intValue();
int a = s;
```

## 正则

```java
// boolean matches(String regex) 判断当前字符串是否匹配指定的正则表达式
String qq = "1239418469";
boolean flag = qq.matches("[1-9][0-9]{4,14}"); // true
```

## 网络编程

* __UDP协议__

```java
public class SendDemo02 {
    public static void main(String[] args) throws IOException {
        // 创建发送端对象
        DatagramSocket datagramSocket = new DatagramSocket();
        // 打包
        String str = "HELLO -- 数据测试";
        byte[] bys = str.getBytes();
        int len = bys.length;
        InetAddress inetAddress = InetAddress.getByName("www.monako.blog");
        DatagramPacket datagramPacket = new DatagramPacket(bys,len,inetAddress,8888);
        // 发送
        datagramSocket.send(datagramPacket);
        //释放资源
        datagramSocket.close();
    }
}
public class ReceiveDemo02 {
    public static void main(String[] args) throws IOException {
        // 创建接收Socket对象
        DatagramSocket datagramSocket = new DatagramSocket(8888);
        // 创建包对象
        byte[] bys = new byte[1024];
        DatagramPacket datagramPacket = new DatagramPacket(bys,bys.length);
        // 接收
        datagramSocket.receive(datagramPacket);
        // 解析
        byte[] data = datagramPacket.getData();
        // 长度
        int len = datagramPacket.getLength();
        // 发送端地址
        InetAddress inetAddress = datagramPacket.getAddress();
        // 输出
        System.out.println(inetAddress.getHostName());
        System.out.println(new String(data,0,len));
        // 释放
        datagramSocket.close();
    }
}
```

* __TCP协议__

```java
// 模拟用户登陆
public class ClientDemo03 {
    public static void main(String[] args) throws IOException {
        // 创建客户端Socket对象
        Socket socket = new Socket("www.monako.blog",9999);
        // 获取用户名和密码
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("请输入用户名：");
        String username = bufferedReader.readLine();
        System.out.println("请输入密码：");
        String password = bufferedReader.readLine();
        // 获取输出对象
        PrintWriter out = new PrintWriter(socket.getOutputStream(),true);
        // 写出数据
        out.println(username);
        out.println(password);
        // 获取服务器返回的数据
        BufferedReader message = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        System.out.println(message.readLine());
        // 释放资源
        message.close();
        bufferedReader.close();
        // socket.close(); 服务器一般不关闭
        out.close();
    }
}
public class ServerDemo03 {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9999);
        Socket socket = serverSocket.accept();
        // 接收解析数据
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        String username = bufferedReader.readLine();
        String password = bufferedReader.readLine();
        // 返回数据
        PrintWriter message = new PrintWriter(socket.getOutputStream(),true);
        String msg = "登陆失败";
        List<User> users = UserDB.getUser();
        User user = new User(username,password);
        if (users.contains(user)){
            msg = "登陆成功";
        }
        message.println(msg);
        socket.close();// 释放
        bufferedReader.close();
        // serverSocket.close(); 服务器一般不关闭
        message.close();
    }
}
public class User {
    private String username;
    private String password;
    public User(String username,String password){
        super();
        this.username = username;
        this.password = password;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        User other = (User)obj;
        if (password == null){
            if (other.password != null)
                return false;
        }else if (!password.equals(other.password))
            return false;
        if (username == null){
            if (other.username != null)
                return false;
        }else if (!username.equals(other.username))
            return false;
        return true;
    }
}
public class UserDB {
    private static List<User> user = new ArrayList<User>();
    static {
        user.add(new User("monako","monako"));
        user.add(new User("xuanxuan","xuanxuan"));
        user.add(new User("momo","momo"));
        user.add(new User("banban","banban"));
    }
    public static List<User> getUser() {
        return user;
    }
}
```