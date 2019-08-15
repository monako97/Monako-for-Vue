[TOC]
# JDBC笔记

> JAVA Database Connectivity 数据库连接

## 基本步骤

1. __注册驱动__
2. __建立连接__
3. __创建statement__
4. __执行sql，得到resultSet__
5. __遍历结果集__
6. __释放资源__

```java
public class JDBCTest {
    public static void main(String[] args) throws ClassNotFoundException {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try {
            // 1. 注册驱动并获取连接对象
            connection = JDBCUtil.getConn();
            // 3. 创建statement，跟数据库打交道，一定要这个对象
            statement = connection.createStatement();
            // 4. 执行查询
            String sql = "select * from blog";
            resultSet = statement.executeQuery(sql);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String readme = resultSet.getString("readme");
                System.out.println(id + " - " + readme);
            }
        } catch (SQLException e) {
            System.out.println("连接数据库失败");
            e.printStackTrace();
        } finally {
            JDBCUtil.release(connection, resultSet, statement);
        }
    }
}
```

### 封装JDBC工具类

```java
//封装JDBC工具类
public class JDBCUtil {
    static String driverClass = null;
    static String url = null;
    static String name = null;
    static String password = null;
    static {
        try{
            // 创建一个属性配置对象
            Properties properties = new Properties();
            InputStream inputStream = new FileInputStream("jdbc.properties");
            // 导入输入流
            properties.load(inputStream);
            // 读取属性
            driverClass = properties.getProperty("driverClass");
            url = properties.getProperty("url");
            name = properties.getProperty("name");
            password = properties.getProperty("password");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    // 获取连接对象
    public static Connection getConn() throws ClassNotFoundException{
        Connection connection = null;
        try {
            Class.forName(driverClass).isInterface();
            // 2. 建立链接 参1：协议+访问的数据库；参2：用户名；参3：密码
            connection = DriverManager.getConnection(url, name, password);
        }catch (SQLException e){
            e.printStackTrace();
        }
        return connection;
    }
    // 释放资源
    public static void release(Connection connection, ResultSet resultSet, Statement statement) {
        closeConnection(connection);
        closeResultSet(resultSet);
        closeStatement(statement);
    }
    public static void release(Connection connection, Statement statement) {
        closeConnection(connection);
        closeStatement(statement);
    }
    private static void closeResultSet(ResultSet resultSet) {
        try {
            if (resultSet != null) {
                resultSet.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            resultSet = null;
        }
    }
    private static void closeStatement(Statement statement) {
        try {
            if (statement != null) {
                statement.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            statement = null;
        }
    }
    private static void closeConnection(Connection connection) {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            connection = null;
        }
    }
}
```

### jdbc.properties

* __使用properties配置文件__

  1. __在src底下声明一个xxx.properties文件__

     ```properties
     // jdbc.properies
     driverClass=com.mysql.cj.jdbc.Driver
     url=jdbc:mysql://地址/数据库
     name=用户
     password=密码
     ```

  2. __在工具类里面，使用静态代码块读取属性__

     ```java
     static {
       try{
         // 创建一个属性配置对象
         Properties properties = new Properties();
         InputStream inputStream = new FileInputStream("xxx.properties"); //对应文件位于工程根目录
         // 使用类加载器，去读取src底下的资源文件，后面在servlet	 对应文件位于src的目录底下
         //InputStream inputStream = JDBCUtil.class.getClassLoader().getResourceAsStream("xxx.properties");
         // 导入输入流
         properties.load(inputStream);
         // 读取属性
         properties.getProperty("属性名");
       }catch (Exception e){
         e.printStackTrace();
       }
     }
     ```

## 数据库的CRUD sql

### insert

```java
// 获取连接对象
connection = JDBCUtil.getConn();
// 根据连接对象。得到statement
statement = connection.createStatement();
// 执行添加SQL语句
String sql = "insert into blog(readme) values('../public/md/使用JDBC集封装常用工具类.md')";
int result = statement.executeUpdate(sql);
// 返回大于0则成功
if (result > 0){
  System.out.println("添加成功");
}else {
  System.out.println("添加失败");
}
```

### query

```java
// 获取连接对象
connection = JDBCUtil.getConn();
// 根据连接对象。得到statement
statement = connection.createStatement();
// 执行SQL语句
String sql = "select * from blog";
resultSet = statement.executeQuery(sql);
// 遍历结果集
while (resultSet.next()){
  String title = resultSet.getString("title");
  System.out.println(title);
}
```

### delete

```java
// 获取连接对象
connection = JDBCUtil.getConn();
// 根据连接对象。得到statement
statement = connection.createStatement();
// 执行添加SQL语句
String sql = "delete from blog where id=4";
int result = statement.executeUpdate(sql);
// 返回大于0则成功
if (result > 0){
  System.out.println("删除成功");
}else {
  System.out.println("删除失败");
}
```

### update

```java
 // 获取连接对象
connection = JDBCUtil.getConn();
// 根据连接对象。得到statement
statement = connection.createStatement();
// 执行添加SQL语句
String sql = "update blog set readme='../public/md/MYSQL的基本使用方法.md' where id=2";
int result = statement.executeUpdate(sql);
// 返回大于0则成功
if (result > 0){
  System.out.println("更新成功");
}else {
  System.out.println("更新失败");
}
```



## 使用单元测试测试代码

* __定义一个类，testxxx，里面定义方法__
* __添加junit支持:__
  1. File > Settings > Plugins
  2. 搜索JunitGeneratorV2.0并安装
  3. File > Project Structures > +  > JAR or directories
  4. 到IDEA安装根目录>lib>junit.jar、junit-4.12.jar、hamcrest-core-1.3.jar

* __使用Junit__

  1. 快捷键：win + shift + t > create new test

  2. 在方法上面加上一个注释，就是一个标记 @Test

  3. 在方法上面右键执行方法

## Dao模式

> Data Access Object 数据访问对象

1. 新建一个接口，里面声明数据库的访问规则

   ```java
   /*定义操作数据库的方法*/
   public interface Blog_Dao {
       /*查询所有*/
       void findAll();
   }
   ```

2. 新建一个dao的实现类，具体实现早前定义的规则

   ```java
   /*定义操作数据库的方法和逻辑*/
   public class BlogDaoImp1 implements Blog_Dao {
       @Override
       public void findAll() {
           Connection connection = null;
           Statement statement = null;
           ResultSet resultSet = null;
           try {
               connection = JDBCUtil.getConn();
               statement = connection.createStatement();
               String sql = "select * from bloglist";
               resultSet = statement.executeQuery(sql);
               while (resultSet.next()){
                   String title = resultSet.getString("title");
                   System.out.println(title);
               }
           }catch (SQLException err){
               err.printStackTrace();
           }finally {
               JDBCUtil.release(connection,resultSet,statement);
           }
       }
   }
   ```

3. 直接使用实现

   ```java
   @Test
   public void testFindAll(){
     BlogDaoImp1 blogDaoImp1 = new BlogDaoImp1();
     blogDaoImp1.findAll();
   }
   ```

### Statement安全问题

1. Statement执行，其实是拼接SQL语句的，先拼接SQL语句，然后再一起执行

```java
String sql = "select * from user where username='"+username+"' and password='"+password+"'";
blogDaoImp1.login("monako","123456' or '1=1");
// 前面先拼接字符串，如果变量里面带有了数据库的关键字，那么一并认为是关键字，不认为是普通字符串
resultSet = statement.executeQuery(sql);
```

2. PrepareStatement

> 该对象就是替换前面的Statement对象

```java
String sql = "select * from user where username=? and password=?";
// 预先对sql语句执行语法的校验，？后面的内容，后面不管传递什么进来都把他看成是字符串
PreparedStatement preparedStatement = connection.prepareStatement(sql);
// ? 对应的索引从1开始
preparedStatement.setString(1,username);
preparedStatement.setString(2,password);
ResultSet resultSet = preparedStatement.executeQuery();
if (resultSet.next()){
  System.out.println("登录成功");
}else {
  System.out.println("登录失败");
}
```

