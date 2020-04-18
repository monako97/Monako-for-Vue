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

```java
public void testC3P0(){
    Connection connection = null;
    PreparedStatement preparedStatement = null;
    try{
    		// 1. 创建datasource
    		ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
    		// 读取配置文件
    		// 默认是xml的default-config分支
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

### DBUtils

#### 增、删、改

```java
ComboPooledDataSource dataSource = new ComboPooledDataSource();
// DBUtils只是简化了CRUD代码，但是连接的时候的创建及获取工作，不在考虑范围
QueryRunner queryRunner = new QueryRunner(dataSource);
// 增加
queryRunner.update("INSERT INTO account VALUES (null,?,?)","MONAKO",1000);
// 删除
queryRunner.update("DELETE FROM account WHERE id = ?",3);
// 更新
queryRunner.update("UPDATE account SET money = ? where id = ?",520,19);
```

#### 查询

```java
// 查询单个对象
Account account = queryRunner.query("SELECT * FROM account WHERE id = ?", new ResultSetHandler<Account>() {
    @Override
    public Account handle(ResultSet result) throws SQLException{
        Account account = new Account();
        while (result.next()){
            String name = result.getString("name");
            int money = result.getInt("money");
            account.setName(name);
            account.setMoney(money);
        }
        return account;
    }
},2);
/* 或：
	Account  account = queryRunner.query("SELECT * FROM account WHERE id = ?",new BeanHandler<Account>(Account.class),2); 
*/
System.out.println(account);
// 查询多个对象
List<Account> accountList = queryRunner.query("SELECT * FROM account ",new BeanListHandler<Account>(Account.class));
for (int i = 0; i < accountList.size(); i++) {
    System.out.println(accountList.get(i).getName()+" - "+accountList.get(i).getMoney());
}
```

### ResultSetHandler 常用的实现类

>   ArrayHandler ==查询到的单个数据封装成一个数组==
>
>   ArrayListHandler ==查询到的多个数据封装成一个集合，集合里面的元素是数组==
>
> ​	BeanHandler ==查询到的数据封装成一个对象==
>
> ​	BeanListHandler ==查询到的数据封装成一个List<对象>==
>
>   MapHandler ==查询到的单个数据封装成一个map==
>
>   MapListHandler ==查询到的多个数据封装成一个集合，集合里面的元素是map==
>
> ColumnListHandler
>
> KeyedHandler
>
> ScalarHandler

### 元数据

> 描述数据的数据 String sql，描述这份 sql 字符串的数据叫做元数据

+ __数据库元数据：__ DatabaseMetaData
+ __参数元数据：__ ParameterMetaData
+ __结果元数据：__ ResultSetMetaData

#### 配合 C3P0 自定义封装 CRUD 工具类

```java
public class CommonCRUDUtil {
    @Test
    public void testUpdate(){
        // update("INSERT INTO account VALUES (null,?,?)","Saber",1000);
        // update("DELETE FROM account where id = ?",20);
        // update("UPDATE account set money = ? where id = ?",520,2);
        // 推荐
        update02("UPDATE account set money = ? where id = ?",120,2,1,19);
    }
    /* 通用的增、删、改功能 ，以参数个数为准
     * @param sql 需要操作的sql语句
     * @param args 可变参数，有几个占位符，就写几个参数进去
     * */
    public void update(String sql,Object...args){
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try{
            connection = JDBCUtil02.getConnection();
            preparedStatement = connection.prepareStatement(sql);

            for (int i = 0; i < args.length; i++) {
                // 因为不知道是森么类型的数据，所以都用setObject对待
                preparedStatement.setObject(i+1, args[i]);
            }

            preparedStatement.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            JDBCUtil02.release(connection,preparedStatement);
        }
    }
    public void update02(String sql,Object...args){
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try{
            connection = JDBCUtil02.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            // 元数据，获取有几个占位符(?)
            ParameterMetaData parameterMetaData = preparedStatement.getParameterMetaData();
            int count = parameterMetaData.getParameterCount();
            for (int i = 0; i < count; i++) {
                // 因为不知道是森么类型的数据，所以都用setObject对待
                preparedStatement.setObject(i+1, args[i]);
            }
            preparedStatement.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            JDBCUtil02.release(connection,preparedStatement);
        }
    }
    class A implements ResultSetHandler<Account>{
        @Override
        public Account handle(ResultSet resultSet) {
            try {
                Account account = new Account();
                while (resultSet.next()){
                    String name = resultSet.getString("name");
                    int money = resultSet.getInt("money");
                    account.setName(name);
                    account.setMoney(money);
                }
                return account;
            }catch (SQLException e){
                e.printStackTrace();
            }
            return null;
        }
    }
    @Test
    public void testQuery(){
        // Account account = query("SELECT * FROM account where money = ?",new A(),520);
        List<Account> account = query("SELECT * FROM account where money < ?", new ResultSetHandler<List<Account>>() {
            @Override
            public List<Account> handle(ResultSet resultSet) {
                List<Account> listAccount = new ArrayList<Account>();
                try{
                    while (resultSet.next()){
                        Account account1 = new Account();
                        account1.setMoney(resultSet.getInt("money"));
                        account1.setName(resultSet.getString("name"));
                        listAccount.add(account1);
                    }
                    return listAccount;
                }catch (SQLException e){
                    e.printStackTrace();
                }
                return null;
            }
        }, 520);
        System.out.println(account.toString());
    }

    public <T> T query(String sql,ResultSetHandler<T> resultSetHandler,Object...args){
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        T t = null;
        try{
            connection = JDBCUtil02.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            // 元数据
            // 获取有几个占位符(?)
            ParameterMetaData parameterMetaData = preparedStatement.getParameterMetaData();
            int count = parameterMetaData.getParameterCount();
            for (int i = 0; i < count; i++) {
                // 因为不知道是森么类型的数据，所以都用setObject对待
                preparedStatement.setObject(i+1, args[i]);
            }
            // 执行查询工作，然后得到结果集
            resultSet = preparedStatement.executeQuery();
            // 吧结果集丢给调用者，让他去封装数据，返回封装数据
            t = (T)resultSetHandler.handle(resultSet);
            // 问题一：这里的数据获取，以及封装成上面的对象返回，不知道，因为调用的地方需要的数据不同
            /*while (resultSet.next()){

            }*/
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            JDBCUtil02.release(connection,resultSet,preparedStatement);
        }
        return t;
    }
}
```

