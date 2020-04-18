[TOC]

# Listener & Filter

## Listener

> 监听器
>
> * 监听某一事件发生，状态改变

* 监听器的内部机制 ==其实就是接口回调==

#### 接口回调

需求：a在循环，循环到5的时候通知b

> 事先把某个对象传递给a，当a执行到5的时候，通过这个对象来调用b中的方法，但是注意，不是直接传递b的实例，而是传递一个接口的实例过去

![](https://i.loli.net/2019/10/02/iRXCsQdoOL1pGIr.jpg)

### Web监听器

> 总共有八个，分三种类型
>
> 使用：
>
>  	1. 定义一个类，实现监听器
>  	2. 注册 ｜ 配置监听器

#### 监听三个作用域的创建与销毁
request --- httpServletRequest
session --- httpsSession
aapplication --- servletContext

* ServletContextListener

  ==context创建==：启动服务器的时候

  ==context销毁==：关闭服务器，从服务器关闭项目

* ServletRequestListener

  ==request创建==：访问任何服务器上的任意资源都会有请求出现

  ==request销毁==：服务器已经对这次请求作出了响应

  __使用：__

  ```java
  @Override
  public void requestDestroyed(ServletRequestEvent sre) {
      System.out.println("ServletRequestListener 销毁了");
  }
  @Override
  public void requestInitialized(ServletRequestEvent sre) {
      System.out.println("ServletRequestListener 初始化了");
  }
  ```

  ```xml
  注册监听器
  <listener>
      <listener-class>blog.monako.listener.demo.MyRequestListener</listener-class>
  </listener>
  ```

  

* HttpSessionListener

  ==session创建==：只要调用getSession

  ​	html:     不会

  ​	jsp:       会

  ​	servlet: 会

  ==session销毁==：

  1. 超时：30分钟 

  2. 正常关闭服务器(序列化)
  3. 非正常关闭(销毁) 

  __作用：__

  * __ServletContextListener：__ 
    1. 在ServletContextListener创建的时候，完成之际想要的初始化工作
    2. 执行自定义的任务调度，执行某个任务，Timer

  * __HttpSessionListener:__
    1. 统计在线人数

#### 监听三个作用域属性状态变更

request --- ServletRequestAttributeListener
session --- HttpSessionAttributeListener
servletContext --- ServletContextAttributeListener

> 可以监听在作用域中值的 ==添加== ｜ ==替换== ｜ ==移除==的动作

```java
// setAttribute
@Override
public void attributeAdded(HttpSessionBindingEvent se) {
    System.out.println("添加了属性");
}
// removeAttribute
@Override
public void attributeRemoved(HttpSessionBindingEvent se) {
    System.out.println("删除了属性");
}
// setAttribute
@Override
public void attributeReplaced(HttpSessionBindingEvent se) {
    System.out.println("替换了属性");
}
```

#### 监听httpSession里面存值的状态变更

>这类监听器不需要注册

* HttpSessionBindingListener

  > 监听对象与session绑定与解除绑定的动作

  * 让javaBean实现接口即可

  ```java
  public class Bean01 implements HttpSessionBindingListener {
      ...
      @Override
      public void valueBound(HttpSessionBindingEvent event) {
          System.out.println("对象被绑定进来了");
      }
      @Override
      public void valueUnbound(HttpSessionBindingEvent event) {
          System.out.println("对象被解除绑定了");
      }
  }
  ```

  ```jsp
  <%
      Bean01 bean = new Bean01();
      bean.setName("monako");
      session.setAttribute("bean",bean);
  %>
  ```

* HttpSessionActivationListener

  > 用于监听现在session的值，是 ==钝化==还是==活化==的动作
  * __钝化：__ ==序列化== 把内存中的数据，存储到硬盘上

  * __活化：__ ==反序列化== 把硬盘中的数据读取到内存中

    * 用意：

    > session的值可能有很多，并且我们有很长一段时间不使用这个内存中的值，那么可以考虑吧session的值存储到硬盘上「钝化」，等下一次再使用的时候，再从硬盘上提取出来「活化」

    * 如何让session的值在一定时间内钝化：

      > 1. 在tomcat中做配置即可 conf/context.xml
      >
      >    ​	对所有运行在这个服务器的项目生效
      >
      > 2. 在tomcat中做配置即可 conf/Catalina/localhost/context.xml
      >
      >    ​	对localhost生效
      >
      > 3. 在自己的web工程中的 META-INFO/context.xml
      >
      >    对当前工程生效

      ```xml
      // maxIdleSwap: 一分钟不用钝化
      // directory：钝化后的文件存放的目录
      <Context>
          <Manager className="org.apache.catalina.session.PersistentManager" maxIdleSwap="1">
             <Store className="org.apache.catalina.session.FileStore" directory="it315" />
          </Manager>
      </Context>
      ```

## Filter

> 过滤器，其实就是对客户端发出的请求进行过滤，浏览器发出，然后服务器派servlet处理，在中间就可以过滤，其实过滤器起到的是拦截作用

* __作用__
  1. 对一些敏感词汇进行过滤
  2. 统一设置编码
  3. 自动登录

#### 如何使用过滤器

1. __定义一个类，实现Filter__

   ```java
   public class FilterDemo implements Filter {
       public void destroy() {
         	System.out.println("过滤器销毁了");
       }
   
       public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException, IOException, ServletException {
           System.out.println("来到了过滤器 before");
         	// 放行
           chain.doFilter(req, resp);
         	System.out.println("来到了过滤器 after");
       }
   		// 初始化时调用
       public void init(FilterConfig config) throws ServletException {
   				System.out.println("过滤器创建了");
       }
   }
   ```

   

2. __注册过滤器__

   > __在web.xml中注册，和servlet基本一样__

   ```xml
   <filter>
     <filter-name>FilterDemo</filter-name>
     <filter-class>com.monako.filter.FilterDemo</filter-class>
   </filter>
   <filter-mapping>
     <filter-name>FilterDemo</filter-name>
     <url-pattern>/*</url-pattern>	过滤路径
     <dispatcher>FORWARD</dispatcher>
   </filter-mapping>
   ```

3. Filter的生命周期
   * __创建__	服务器启动
   * __销毁__        服务器关闭

#### Filter执行顺序

1. 客户端发出请求，先经过__Filter__，如果__Filter__放行，那么才能到达__servlet__
2. 如果有多个__Filter__，那么会按照注册的映射顺序来排队，只要有一个__Filter__不放行，那后面的__Filter__和__servlet__都不会收到请求

#### 细节

1. __init__方法的参数__filterConfig__，可以用于获取__filter__在注册的名字，以及初始化参数 ==设计初衷与ServletConfig是一样的==

2. 如果放行，那么在__doFilter__方法里面操作，使用参数__filterChain__

3. __\<url-pattern>/*\</urlpattern>__ 写法格式与Servlet一样

   1. 全路径匹配	以 / 开始

      /login 

   2. 以目录匹配        以 / 开始，以 * 结束

      /login/*

   3. 以后缀名匹配     以 * 开始，以后缀名结束

      *.html

   4. 针对__dispatch__设置

      REQUEST：只要是请求过来，都拦截，默认就是REQUEST

      FORWARD：只要是转发都拦截

      ERROR：页面出错发生跳转

      INCLUDE：包含页面的时候拦截

#### 自动登录

> 思路：
>
> 1. 先判断session是否有效，如果有效就不用取cookie，直接放行
> 2. 如果session失效了，那么就取cookie
>    1. 没有cookie，放行
>    2. 有cookie
>       1. 取出cookie的值，然后完成登录
>       2. 吧这个用户的信息存储到session中
>       3. 放行

```java
// servlet
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
  String username = req.getParameter("username");
  String password = req.getParameter("password");
  String autoLogin = req.getParameter("auto_login");
  UserBean user = new UserBean();
  user.setUsername(username);
  user.setPassword(password);
  UserDao userDao = new UserDaoImpl();
  System.out.println(username + ": " + password + "  自动登录: " + autoLogin);
  UserBean userBean;
  try {
    userBean = userDao.login(user);
    if (userBean != null) {
      // 页面提交上来的时候是否选择了自动登录
      if ("on".equals(autoLogin)){
        // 发送cookie给客户端
        Cookie cookie = new Cookie("token",username+"&"+password);
        cookie.setMaxAge(60*60*24*7); // 7天有效期
        // cookie.setPath("/LoginServlet");
        cookie.setPath(req.getContextPath()); //当前应用的地址
        resp.addCookie(cookie);
      }
      // 登录成功
      req.getSession().setAttribute("userBean", userBean);
      resp.setStatus(200);
      resp.sendRedirect("http://localhost");
    } else {
      // 登录不成功
      req.getRequestDispatcher("login.html").forward(req, resp);
    }
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
// filter
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
  try {
    HttpServletRequest servletRequest1 = (HttpServletRequest) servletRequest;
    // 1。先判断现在的session中还有没有这个userBean
    UserBean userBean = (UserBean) servletRequest1.getSession().getAttribute("userBean");
    if (userBean!=null){
      // 不为空那么
      filterChain.doFilter(servletRequest,servletResponse);
    }else{
      // 代表session失效了
      // 2。查cookie
      // 来请求的时候，先从请求中取出cookie，但是cookie里有很多key value
      Cookie[] cookies = servletRequest1.getCookies();
      // 从一堆cookie中找出我们给浏览器发的cookie
      Cookie cookie = CookieUtil.findCookie(cookies, "token");
      if (cookie != null){
        // cookie不是空，表明这个cookie以前登录过
        String value = cookie.getValue();
        String username = value.split("&")[0];
        System.out.println(username);
        String password = value.split("&")[1];
        // 完成登录
        UserBean user = new UserBean();
        user.setUsername(username);
        user.setPassword(password);
        UserDao userDao = new UserDaoImpl();
        userBean = userDao.login(user);
        // 使用session存这个值到域中，方便下一次为过期前还可以用
        servletRequest1.getSession().setAttribute("userBean",userBean);
        // 放行

      }else{
        // 没有cookie，表明第一次来或cookie失效了，比如用户关闭浏览器
        System.out.println("cookie失效");
      }
      filterChain.doFilter(servletRequest,servletResponse);
    }
  } catch (SQLException e) {
    e.printStackTrace();
    // 放行
    filterChain.doFilter(servletRequest, servletResponse);
  }

}
```



#### BeanUtils的使用

```java
// 注册自己的转换器
ConvertUtils.register(new MyDateConverter(), Date.class);
// 转化数据
Map<String, String[]> properties = req.getParameterMap();
// 转化map的数据放到bean对象上
BeanUtils.populate(bean, properties);
```

