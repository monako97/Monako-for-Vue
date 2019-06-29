[TOC]
# HTTP协议 & Servlet
## HTTP协议

* 什么是协议

> 双方在交互、通讯的时候，遵守的一种规范，规则

* HTTP协议

> 针对网络上的客户端于服务器在执行http请求的时候，遵守的一种规范，其实就是规定了客户端在访问服务器的时候要带上哪些东西，服务器返回数据的时候，也要带上些东西

* 版本

  1.0 --- 请求数据，服务器返回后将会断开连接
  1.1 --- 请求数据，服务器返回后，连接还会保持，除非服务器|客户端关掉，有一定的时间限制，如果都空着这个连接，那么后面会自己断掉

### HTTP请求数据解释

> 请求的数据里面包含三个部分内容：请求行、请求头、请求体

## Servlet

> 一个Java程序，运行在web服务器上，用于接收和响应客户端的请求
>
> 更多的是配合动态资源来做，当然静态资源也需要使用servlet，只不过是Tomcat里面已经定义好了一个DefaultServlet

### Hello Servlet

1. 写一个web工程，要有一个服务器

2. 测试运行web工程
   1. 新建类，实现servlet接口
   2. 配置servlet， 用意就是告诉服务器我们的应用有这么些个servlet ==WEB-INF/web.xml==

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
       <display-name>HelloServlet</display-name>
       <welcome-file-list>
           <welcome-file>index.html</welcome-file>
       </welcome-file-list>
       <!-- 向tomcat报告，我这个应用里面有这么个servlet，名字叫a，具体的路径是blog.monako.servlet.HelloServlet -->
       <servlet>
           <servlet-name>HelloServlet</servlet-name>
           <servlet-class>blog.monako.servlet.HelloServlet</servlet-class>
           <!-- 使用load-on-startup让servlet创建实例的时机提前，给定的数字越小，启动时机越早，一般不写负数，从2开始即可 -->
           <load-on-startup>2</load-on-startup>
           <!-- 可以添加初始化参数 -->
           <init-param>
               <param-name>朋友</param-name>
               <param-value>玄玄</param-value>
           </init-param>
           <init-param>
               <param-name>我</param-name>
               <param-value>monako</param-value>
           </init-param>
       </servlet>
       <!--  注册servlet的映射，
       servletName：找到上面注册的具体Servlet，
       url-pattern：在地址栏上的path 一定要 / 开头 -->
       <servlet-mapping>
           <servlet-name>HelloServlet</servlet-name>
           <url-pattern>/a</url-pattern>
       </servlet-mapping>
   </web-app>
   ```

   3. 在地址栏上输入：localhost:8080/项目名称/a

### Servlet通用写法

Servlet（接口）
        |
        |
GenericServlet
        |
        |
HttpServlet（用于处理http请求）

1. 定义一个类，继承HttpServlet，复写doGet 和 doPost

### Servlet的生命周期

1. init ==初始化==
2. service ==客户端每来一个请求就执行一次这个方法==
3. destroy ==servlet销毁时执行，该项目从tomcat中移除 或 正常关闭tomcat服务器==

### ServletConfig

> Servlet的配置，通过这个对象，可以获取servlet在配置的时候以下信息

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // ServletConfig 可以获取servlet在配置的以下信息
        // 得到servlet配置对象，专门用于在配置的servlet的信息
        ServletConfig servletConfig = getServletConfig();
        // 获取到的是配置servlet里面servlet-name的文本内容
        String name = servletConfig.getServletName();
        System.out.println("ServletName："+name);
        // 可以获取具体的某一个参数
        String initName = servletConfig.getInitParameter("朋友");
        System.out.println("获取具体的某一个参数"+initName);
        // 获取全部的参数
        Enumeration<String> enumeration = servletConfig.getInitParameterNames();
        while (enumeration.hasMoreElements()){
            String names = (String) enumeration.nextElement();
            String value = servletConfig.getInitParameter(names);
            System.out.println("获取全部参数"+value);
        }
    }
```

## Servlet配置方式

* __全路径匹配__

> 以 ==/== 开始

* __路径匹配，前半段匹配__

> 以 ==/== 开始，以 ==*== 结束
>
> ==*== 通配符

* __以扩展名匹配__

> 没有 ==/== ，以==*== 开始， *.扩展名

## ServletContext

> 每个web工程都只有一个ServletContext对象

### ServletContext的作用

#### 1. 获取全局配置参数

```java
public class ServletContextDemo01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取对象
        ServletContext servletContext = getServletContext();
        // 获取属性值
        String address = servletContext.getInitParameter("address");
        System.out.println(address); // 江西南昌红谷滩
    }
}
```

```xml
<!-- 用于配置全局的参数 -->
<context-param>
  <param-name>address</param-name>
  <param-value>江西南昌红谷滩</param-value>
</context-param>
```

#### 2. 可以获取web工程中的资源

1. __获取资源在 tomcat 里面的绝对路径__ ==先得到路径，然后自己new InputStream==

   > 此处，如果想获取web工程下的资源，用普通的FileInputStream写法是不行的，因为路径不对了，这里相对的路径，其实是根据 jre 来确定的，但是这里是一个web工程，jre 后面会由 tomcat 管理，所以这里相对的路径是 tomcat 里的bin目录

```java
Properties properties = new Properties(); // 创建属性对象
ServletContext servletContext = getServletContext(); // 获取 ServletContext 对象
String path = servletContext.getRealPath("file/config.properties"); // 获取给定的文件在服务器上的决对路径
InputStream is = new FileInputStream(path); // 指定载入的数据源
properties.load(is);
String name = properties.getProperty("name"); // 获取属性
```

2. __getResourceAsStream 获取资源流对象__ ==直接给相对路径，然后获取流对象==

```java
ServletContext servletContext = getServletContext(); // 获取 ServletContext 对象
Properties properties = new Properties(); // 创建属性对象
InputStream is = servletContext.getResourceAsStream("file/config.properties"); // 获取 web 工程下的资源转化成流对象，前面隐藏着当前工程的根目录
properties.load(is);
String name = properties.getProperty("name"); // 获取属性
```

3. __通过classloader去获取web工程下的资源__

```java
 // 创建属性对象
Properties properties = new Properties();
// 获取该java文件的class，然后获取到加载这个class到虚拟机中的那个类加载器对象
// 默认的getClassLoader路径：项目/WEB-INF/classes，我们必须回到项目目录下
InputStream is = this.getClass().getClassLoader().getResourceAsStream("../../file/config.properties");
properties.load(is);
String name = properties.getProperty("name"); // 获取属性
```

#### 3. getServletContext() 存 / 取数据

__存：__ getServletContext().setAttribute(属性名,值);

__取：__ getServletContext().getAttribute(属性名);

### ServletContext生命周期

> 服务器启动 ==会为托管的每一个web应用程序创建一个ServletContext对象==
> 			|
> 			|
> 从服务器托管，或者关闭服务器

* __ServletContext的作用范围__

> 只要在这个项目里面，都可以取