[TOC]

# HttpServletRequest 和 HttpServletResponse

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

