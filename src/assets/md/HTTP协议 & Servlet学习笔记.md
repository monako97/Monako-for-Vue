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
               <param-name>女朋友</param-name>
               <param-value>玄玄</param-value>
           </init-param>
           <init-param>
               <param-name>我</param-name>
               <param-value>么么</param-value>
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
        String initName = servletConfig.getInitParameter("女朋友");
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

