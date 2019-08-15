[TOC]
# 事务&数据库连接池&DBUtils

## 事务

==为了确保逻辑成功==

> Transaction 其实指的是一组操作，里面包含许多个单一的逻辑，只要有一个逻辑没有执行成功，那么都算执行失败，所有的数据都回归到最初的状态==回滚==

### 用命令行方式演示事务

首先，我们需要关闭数据库的自动提交功能

```sql
set autocommit=off;
```

1. __开启事务__

```sql
start transaction;
```

2. __回滚 & 提交事务__

```sql
-- 回滚，回到最初的状态
rollback;
-- 提交，数据会写到磁盘上的数据库
commit;
```

#### 演示事务：

![演示事务](https://i.loli.net/2019/06/30/5d1856de0ce6327604.png "演示事务")

### 使用代码方式演示事务

> 代码里面的事务，主要是针对连接来的
>
> 通过==setAutoCommit(false)==来关闭自动提交的设置

```java
public void testTransaction(){
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try {
        connection = JDBCUtil.getConnection();
        // 默认的连接事务就是自动提交
        connection.setAutoCommit(false);
        String sql = "update account set money = money - ? where id = ?";
        preparedStatement = connection.prepareStatement(sql);
        // 扣除 id 为 1 的 100 元
        preparedStatement.setInt(1,100);
        preparedStatement.setInt(2,1);
        int result = preparedStatement.executeUpdate();
        if (result>0){
            // 扣完 1 的钱，给 2 加钱
            preparedStatement.setInt(1,-100);
            preparedStatement.setInt(2,2);
            result = preparedStatement.executeUpdate();
            if (result>0){
                System.out.println("交易成功");
                // 提交事务
                connection.commit();
            }else {
                System.out.println("收款失败，交易取消");
                // 回滚事务
                connection.rollback();
            }
        }else {
            System.out.println("转账失败，交易取消");
            // 回滚事务
            connection.rollback();
        }
    }catch (SQLException e){
        try {
            // 回滚事务
            connection.rollback();
        }catch (SQLException e1){
            e1.printStackTrace();
        }
        e.printStackTrace();
    }finally {
        JDBCUtil.release(connection,preparedStatement);
    }
}
```

### 事务的特性

* __原子性__

> 指的是事务中包含的逻辑，不可分割

* __一致性__

> 指的是事务执行前后，数据完整性

* __隔离性__

> 指的是事务在执行期间不应该受到其它事务的影响

* __持久性__

> 指的是事务执行成功，那么数据因该持久性保存在磁盘上

### 事务的安全隐患

> 不考虑隔离级别设置，那么会出现以下问题

* __读：__ 

  1. __脏读__

  > 一个事务读到了另外一个事务还未提交的数据

  2. __不可重复读__

  > 一个事务读到了另一个事务提交的数据，造成了前后两次查询结果不一致

  3. __幻读__

  > 一个事务读到了另一个事务已提交的插入的数据，导致多次查询结果不一致

### 设置隔离级别

```sql
-- 查看隔离级别 mysql 8 
select @@transaction_isolation;
-- 关键字：
		-- 全局配置： global
		-- 当前会话： session
-- 隔离级别：
		-- 读未提交： read uncommitted   引发问题：脏读
		-- 读已提交： read committed     可以屏蔽脏读现象，但是引发另一个问题，不可重复读
		-- 可重复读： repeatable read    解决脏读、不可重复读，未解决幻读
		-- 可串行化： serializable       解决脏读、不可重复读、幻读；一般比较少用，效率比较低；如果有一个连接隔离级别设置了串行化，那么谁先开启事务，谁就有了先执行执行的权利，后打开事务的就只能等前面的事务提交或者回滚后才能执行
set 关键字 transaction isolation level 隔离级别;
```

![隔离级别](https://i.loli.net/2019/06/30/5d187667b080378238.png "隔离级别")

__按效率划分（从高到低）__

> 读未提交 > 读已提交 > 可重复读 > 可串行化

* __写：__ 丢失更新 

### 解决丢失更新

* __乐观锁：__ 查询的时候加入 for update

## 数据库连接池

### DBCP

> ==dbcp==、==logging==、==pool==

#### 不使用配置文件

```java
public void testDBCP01(){
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try{
        // 1. 构建数据源对象
        BasicDataSource basicDataSource = new BasicDataSource();
        // 设置连的数据库，用户名，密码
        basicDataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        basicDataSource.setUrl("jdbc:mysql://localhost/bankdemo");
        basicDataSource.setUsername("root");
        basicDataSource.setPassword("54guoshuai");
        // 2. 得到连接对象
        connection = basicDataSource.getConnection();
        String sql = "INSERT INTO account VALUES (null,?,?)";
        preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1,"admin");
        preparedStatement.setInt(2,1000);
        preparedStatement.executeUpdate();
    }catch (SQLException e){
        e.printStackTrace();
    }finally {
        JDBCUtil.release(connection,preparedStatement);
    }
}
```

#### 使用配置文件

```java
public void testDBCP02(){
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try{
        // 1. 构建数据源对象
        BasicDataSourceFactory basicDataSourceFactory = new BasicDataSourceFactory();
        // 读取配置文件
        Properties properties = new Properties();
        InputStream inputStream = new FileInputStream("src//dbcpconfig.properties");
        properties.load(inputStream);
        DataSource dataSource = basicDataSourceFactory.createDataSource(properties);
        // 2. 得到连接对象
        connection = dataSource.getConnection();
        String sql = "INSERT INTO account VALUES (null,?,?)";
        preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1,"admin");
        preparedStatement.setInt(2,1000);
        preparedStatement.executeUpdate();
    }catch (Exception e){
        e.printStackTrace();
    }finally {
        JDBCUtil.release(connection,preparedStatement);
    }
}
```

### C3P0

#### 不使用配置文件

```java
public void testC3P0(){
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try{
        // 1. 创建datasource
        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
        // 3. 设置信息
        comboPooledDataSource.setUser("root");
        comboPooledDataSource.setJdbcUrl("jdbc:mysql://localhost/bankdemo");
        comboPooledDataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
        comboPooledDataSource.setPassword("54guoshuai");
        // 2. 得到连接对象
        connection = comboPooledDataSource.getConnection();
        String sql = "INSERT INTO account VALUES (null,?,?)";
        preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1,"admin");
        preparedStatement.setInt(2,1000);
        preparedStatement.executeUpdate();
    }catch (Exception e){
        e.printStackTrace();
    }finally {
        JDBCUtil.release(connection,preparedStatement);
    }
}
```

#### 使用配置文件



