[TOC]

# HttpServletRequest 和 HttpServletResponse

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

## HttpServletRequest

> 这个对象封装了客户端提交过来的一切数据

### 获取客户端请求头信息

```java
// 取出请求里面的所有头的信息,得到枚举集合
Enumeration<String> headerName = req.getHeaderNames();
while (headerName.hasMoreElements()){
  String name = (String)headerName.nextElement();
  String value = req.getHeader(name);
  System.out.println(name+"："+value);
}
```

### 获取客户端提交的数据

* __getParameter("参数")__
* __getParameterMap()__

```java
// String names = req.getParameter("name");
// System.out.println("提交的数据："+names);

// user=xixi&user=haha&user=xuxu
// 一个key可以对应多个值
Map<String,String[]> map = req.getParameterMap();
Set<String> keySet = map.keySet();
Iterator<String> iterator = keySet.iterator();
while (iterator.hasNext()){
  String key = (String) iterator.next();
  String value = map.get(key)[0];
  String value1 = map.get(key)[1];
  String value2 = map.get(key)[2];
  System.out.println(key+": "+value+"="+value1+"="+value2);
}
```

### 获取中文数据

> 客户端提交给服务器，如果出现中文乱码的话，可以使用以下方法解决

* __GET 方式__

```java
String names = req.getParameter("name");
System.out.println("提交的数据："+names);
// get请求过来的数据，在url上就已经编码过了，所以我们取到的就是乱码
// tomcat收到这条数据，getParameter默认使用 ISO-8859-1 去解析
names = new String(names.getBytes("ISO-8859-1"),"UTF-8");
System.out.println("提交的数据ISO-8859-1："+names);
// 或者直接走tomcat里面做设置处理
```

* __POST 方式__

```java
// 设置请求体里面的文字编码，get方式不能用
req.setCharacterEncoding("UTF-8");
```

## HttpServletResponse

> 负责响应数据给客户端

### 输出数据到页面上

```java
// 设置当前这个请求的处理状态码
resp.setStatus("");
// 设置请求头
resp.setHeader("","");
// 以字符流的方式写数据
// resp.getWriter().write("DEMO02");
// 以字节流的方式写数据
resp.getOutputStream().write("HELLO getOutputStream".getBytes());

```

### 响应数据中文乱码

* __以字符流输出__

> 写出去的文字，默认使用的是==ISO-8859-1==，我们可以指定写出去的时候，用什么编码

```java
// 1、指定输出的时候使用UTF-8编码
resp.setCharacterEncoding("UTF-8");
// 2、直接规定浏览器看这份数据的时候使用什么编码
resp.setHeader("Content-Type","text/html;charset=UTF-8");
```

* __以字节流输出__

> 如果想让服务端出去的是中文，客户端显示正常，只要确定一点，出去的时候的编码和客户端看这份数据的编码是一样的，默认情况下==getOutputStream==，使用的是==UTF-8==

```java
// 1、指定浏览器看这份数据使用的码表
resp.setHeader("Content-Type","text/html;charset=UTF-8");
// 2、指定输出的中文用的码表
resp.getOutputStream().write("HELLO getOutputStream".getBytes("UTF-8"));
```

* __通用方法__

```java
resp.setContentType("text/html;charset=UTF-8");
```

### 下载资源并解决乱码问题

1. __直接以超链接的方式下载，不写任何代码也能下载东西__

> tomcat 里面有一个默认的 servlet — defaultServlet，这个 defaultServlet 专门用于处理放在 tomcat 服务器上的静态资源

2. __以下载文件的方式下载文件__

```java
public class Demo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1、获取要下载的文件
        String fileName = req.getParameter("filename"); 
        // 2、获取这个文件在tomcat里的绝对路径
        String path = getServletContext().getRealPath("download/"+fileName); 
        /* 如果文件名有中文，那么需要对这个文件进行编码处理
         * 如果是 IE 或者 Chrome，使用 URLEncoding 编码
         * 如果是 Firefox, 使用 Base64 编码 */
        // 3、获取来访的客户端类型
        String userAgent = req.getHeader("User-Agent").toLowerCase(); 
        if(userAgent.contains("safari") && !userAgent.contains("chrome")) {
            //处理safari的乱码问题
            byte[] bytesName = fileName.getBytes("UTF-8");
            fileName = new String(bytesName, "ISO-8859-1");
        } else {
            fileName = URLEncoder.encode(fileName,"UTF-8");
        }
        // 4、设置下载文件的请求头，让浏览器收到这份资源的时候，以下载的方式处理
        resp.setHeader("Content-Disposition","attachment;fileName="+fileName); 
        // 处理firefox的空格截断问题
        if (userAgent.contains("firefox")){
            fileName = DownloadUtil.base64EncodeFileName(fileName);
            resp.setHeader("Content-Disposition",String.format("attachment; filename=\"%s\"", fileName));
        }
        // 4、转化成输入流
        InputStream inputStream = new FileInputStream(path);
        OutputStream file = resp.getOutputStream();
        int len = 0;
        byte[]buffer = new byte[1024];
        while ((len = inputStream.read(buffer)) != -1){
            file.write(buffer,0,len);
        }
        file.close();
        inputStream.close();
    }
}
```

```java
public class DownloadUtil {
    public static String base64EncodeFileName(String fileName){
        BASE64Encoder base64Encoder = new BASE64Encoder();
        try {
            return "=?UTF-8?B?" + new String(base64Encoder.encode(fileName.getBytes("UTF-8"))) + "?=";
        }catch (UnsupportedEncodingException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
```

### 请求转发和重定向

* __重定向__

__之前的写法：__

```java
response.setStatus(302);
response.setHeader("Location","login_succes.html");
```

__重定向写法：__

```java
response.sendRedirect("login_succes.html");
```

* __请求转发__ 

```java
request.getRequestDispatcher("login_succes.html").forward(request,response);
```

|                         sendRedirect                         |            getRequestDispatcher            |
| :----------------------------------------------------------: | :----------------------------------------: |
|                  显示的是最后资源的路径地址                  |    地址栏显示的是请求的 servlet 的地址     |
| 请求次数最少有两次，服务器在第一次请求后会返回302，以及一个地址，浏览器会根据这个地址进行第二次访问 | 请求只有一次，服务器内部帮客户端执行了请求 |
|          可以跳转任意路径，不是自己的工程也可以跳转          |           只能跳转自己项目的资源           |
|                           效率较低                           |                  效率较高                  |

## Cookie的使用及常用方法

```java
// 创建 cookie 对象
Cookie cookie = new Cookie("monako","momo");

/* 设置 cookie 的时效
 * 正值：这个值的秒数后失效
 * 负值：浏览器关闭就失效
 * 0:立即删除 */
cookie.setMaxAge(60*60*24*7);

// 赋值新的值
// cookie.setValue(newValue);

// 用于指定只有请求了指定的域名，才会带上该cookie
cookie.setDomain(".monako.com");

// 只有访问该域名下的 demo 这个路径地址才会带上cookie
cookie.setPath("/demo");

// 给响应添加 cookie，可以给客户端返回多个 cookie
response.addCookie(cookie);
response.getWriter("请求成功了");
// 获取客户端带过来的cookie
Cookie[] cookies = request.getCookies();
if(cookies != null){
  for(Cookie c : cookies){
  	String cookieName = c.getName(); // monako
    String cookieValue = c.getValue(); // momo
	}
}
```

### Cookie的安全问题

> 由于 Cookie 会保存在客户端上，所以有安全隐患问题，还有一个问题，Cookie 的大小个数有限制，为了解决这个问题 ——> ==Session==

## Session

> 会话，Session 是基于 Cookie 的一种会话机制。
>
> Cookie 是服务器返回一小段数据给客户端，并且存放在客户端上；
>
> Session是数据存放在服务器端

### Session创建与销毁

* __创建：__ Servlet 里面调用 request.getSession()
* __销毁：__ Session 是存放在服务器内存中的，当然可以持久化，Redis，即使关了浏览器，sesstion也不会销毁

> 1. 关闭服务器。
> 2. Session 会话时间过期，有效期过了。==默认有效期：30分钟==

### 移除Session中的元素

* __强制干掉会话，清除里面存放的数据__

```java
session.invalidate();
```

* __从Session中移除某一个数据__

```java
session.removeAttribute("name");
```


