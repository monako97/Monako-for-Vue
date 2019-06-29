[TOC]

# Cookie & Session

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

