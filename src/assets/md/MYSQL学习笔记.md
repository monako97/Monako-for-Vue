[TOC]
# MYSQL学习笔记

## Centos 7中安装mysql 8

1. wget 下载源安装包

   ```shell
   wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
   ```

2. 安装 yum repo 文件

   ```shell
   rpm -ivh mysql80-community-release-el7-3.noarch.rpm
   ```

3. 更新yum缓存

   ```shell
   yum clean all
   yum makecache
   ```

4. 安装mysql服务器，当我们在使用yum安装mysql时，yum默认会从yum仓库中安装mysql最新的GA版本；

   ```shell
   -- 查看mysql yum仓库中mysql版本
   yum repolist all | grep mysql
   ```

   ![](https://i.loli.net/2019/12/24/DlBQOy7ZtusG2Xb.png)

   > 可以看到mysql8是可用的，其它是禁用的，我正好是需要安装mysql8，所以不用管了
   >
   > 如果想要安装其它版本可以修改：__yum-config-manager --enable mysql57-community__

5. 安装mysql服务

   ```shell
   yum install mysql-community-server
   ```

   * 启动：systemctl start mysqld.service

   * 停止：systemctl stop mysqld.service

   * 重启：systemctl restart mysqld.service

   * 查看服务状态：systemctl status mysqld.service

   * 允许远程登录

     ```sql
     -- 创建新的远程用户
     CREATE USER '用户名'@'%' IDENTIFIED BY '密码';
     -- 授权给远程用户
     GRANT ALL ON *.* TO '[用户名]'@'%'; 
     -- ALL表示授予所有权限
     -- *.*表示所有数据库中的所有表
     -- %表示任意IP可以远程连接
     ```

6. Mysql8 重置root密码

   ```sql
   -- 查看默认密码
   grep "A temporary password" /var/log/mysqld.log
   -- 修改变量
   set global validate_password.policy=0;
   set global validate_password.length=4;
   -- 退出后执行，配置Mysql安全策略
   mysql_secure_installation
   ```

   

## 基础操作

* MYSQL的SQL语句：__
  1. __SQL：__ Structure Query Language结构化查询语句
  2. __DDL：__ 数据定义语言：定义数据库、数据表它们的结构：create==创建==、drop==删除==、alter==修改==
  3. __DML：__ 数据操作语言：主要用来操作数据：insert==插入==、update==修改==、delete==删除==
  4. __DCL：__ 数据控制语言：定义访问权限，取消访问权限，安全设置、grant
  5. __DQL：__ 数据查询语言：select==查询==、from子句 where子句

## 数据库的CRUD的操作

### 登录

```sql
mysql -u用户名 -p密码;
```

### 创建数据库

```sql
-- 创建数据库
create database 数据库名称;
-- 创建数据库的时候，指定字符集和校对规则;
create database 数据库名称 character set 字符集 collate 校对规则;
```

### 查看数据库

```sql
-- 查看所有数据库
show databases;
-- 查看数据库创建过程
show create database 数据库的名字;
```

### 修改数据库

```sql
-- 修改数据库的字符集
-- alter database 数据库 character set 字符集;
alter database monako character set utf8 collate utf8_bin;
```

### 删除数据库

```sql
drop database 数据库名称;
```

### 其它数据库操作命令

```sql
-- 使用/切换数据库
use 数据库名称;
-- 查看当前正在使用的数据库
select database();
```

## 表CRUD操作

### 创建表

```sql
-- create table 表名(字段1 字段类型 约束,字段2 字段类型 约束);
create table user(username char(31) not null,password char(20) not null);
-- 列的约束
--    主键约束：primary key
--    唯一约束：unique
--    非空约束：not null
```

* __Date类型：__
  1. __datetime：__ YYYY-MM-DD hh:mm:ss ==默认是null==
  2. __timestamp：__ YYYY-MM-DD hh:mm:ss ==默认是当前时间==
  3. __date：__ YYYY-MM-DD
  4. __time：__ hh:mm:ss

### 查看表

```sql
-- 查看所有表
show tables;
-- 查看表创建过程
show create table 表名;
-- 查看表结构
desc 表名;
```

### 修改表

```sql
-- 添加列(add)
alter table 表名 add 字段名 数据类型 约束;
-- 修改列(modify)
alter table 表名 modify 字段名 数据类型 约束;
-- 修改列名(change)
alter table 表名 change 旧字段名 新字段名 数据类型 约束;
-- 删除列(drop)
alter table 表名 drop 列名;
-- 修改表名(rename)
rename table 表名 to 新表名;
-- 修改表的字符集
alter table 表名 character set 字符集;
-- 举个栗子
create table bloglist(
  id int unsigned not null primary key auto_increment,
  title varchar(50) not null,
  sub_title varchar(100),
  create_time timestamp not null default current_timestamp,
  update_time timestamp not null on update current_timestamp default current_timestamp,
  image varchar(255) not null)
  auto_increment=1;
```

### 删除表

```sql
drop table 表名;
```

## Sql完成对表中数据的CRUD的操作

### 插入表数据

```sql
-- 标准写法
insert into 表名(字段1,字段2) values(值1,值2);
-- 简单写法：如果插入的是全部字段的数据，那么表名后面的字段名可以参略
insert into 表名 values(值1,值2);
-- 批量插入
insert into 表名 values(值1,值2),(值1,值2),(值1,值2);
-- 举个栗子
INSERT INTO `数据库名`.`表`(`字段名`) VALUES ('值');
insert into bloglist(
  title,sub_title,image
) 
values(
  "Java基础笔记",
  "阁下要来一杯提升醒脑的Java吗？",
  "https://i.loli.net/2019/06/13/5d02473b9253252029.jpg"
);
```

* __命令行下插入中文问题：__

  * __临时解决方案：__  set names gbk;

  > 相当于高速mysql服务器软件，我们当前在命令行下输入的内容是GBK编码,当命令行窗口关闭后需要再次设置

  * __永久解决方案：__  修改my.ini配置

  > 暂停mysql服务
  >
  > 在mysql安装路径打开my.ini文件
  >
  > 将57行的编码换成gbk
  >
  > 启动mysql服务

### 删除表数据

```sql
-- 如果没有指定条件，会把表中数据全部删掉
delete from 表名 where 条件;
delete from 表名;
```

* __delete 删除数据和 truncate 删除数据的区别__
  1. __delete：__ DML 一条一条删除表中数据
  2. __truncate：__ DDL 先删除表，再重建表
  3. __效率：__ 具体看表中的数据量，数据量比较少，==delete==效率高，数据大则==truncate==效率高

### 更新表数据

``` sql
update 表名 set 字段1=字段1值,字段2=字段2值 where 条件;
```

### 查询表数据

```sql
-- 查询指定字段
select 字段1,字段2 from 表名 where 条件;
-- 查询全部字段
select * from 表名 where 条件;
-- 查询整表
select * from 表名;
-- 去除重复的数据
select distinct 字段1,字段2 from 表名 where 条件;
-- 别名查询
-- 表别名
select 别名1.字段1,别名1.字段2 from 表1 as 别名1;
-- 字段别名
select 字段1 as 别名1,字段2 as 别名2 from 表名;
-- 运算查询
select 字段*1.5 as 折后价 from 表名;
```

### where

* __关系关系运算符：__ >、>=、<、<=、=、!= ==非标准sql语法==、<>==不等于:标准sql语法==
* __逻辑运算符：__ and==并且==、or==或==、not
* __like：__ 模糊查询
  1. __\_ ：__ 代表一个字符 
  2. __%：__ %代表多个字符
  ```sql
  -- 查询名字中带有玄的所有用户 %玄%
  select * from 表名 where name like "%玄%";
  -- 查询第二个字是玄的所有用户 _玄%
  select * from 表名 where name like "_玄%";
  ```
* __in：__ 在某个范围中的值
  ```sql
  -- 查询处id在1、4、5里面的所有
  select * from 表名 where id in (1,4,5);
  ```

### 排序查询 

__order by 关键字：__
* __asc：__ ascend 升序
* __desc：__ descend 降序

```sql
select * from 表名 order by 字段名 desc
```

### 聚合函数

__注意：__ ==where条件后面不能接聚合函数==
* __sum()：__ 求和
* __avg()：__ 求平均值
* __count()：__ 统计数量
* __max()：__ 最大值
* __min()：__ 最小值
  ```sql
  select max(字段) from 表名;
  select count(字段) from 表名;
  select avg(字段) from 表名;
  select sum(字段) from 表名;
  select min(字段) from 表名;
  ```

### 分组

__group by：__

* __having：__ 关键字，可以接聚合函数，出现在分组最后
* __where：__ 关键字，不可以接聚合函数，出现在分组之前

```sql
-- 按name字段分组，分组后统计数量
select name,const(*) from 表名 group by name;
-- 按name字段分组，分组后统计每组中age的平均值，并且平均值 > 60
select name,avg(age) from 表名 group by name having avg(*) > 60;
```

### 编写顺序&执行循序

* __编写顺序：__ S…F…W…G…H…O
* __执行顺序：__ F…W…G…H…S…O

```sql
select ... from ... where ... group by... having ... order by;
```

## 多表操作

### 外键约束：

* __foreign key：__

  1. 给表中的某个字段添加一个外键约束

  ```sql
  alter table 表名 add foreign key(字段名) references 外表名(字段名);
  ```

* __多表之间的建表原则：__
  1. __一对多：__ 在多的一方添加一个外键，指向少的一方的主键
  2. __多对的：__ 建立一张中间表，将多对多的关系拆分成一对多的关系，中间表至少要两个外键，分别指向原来的那两张表
  3. __一对一：__ ==用的不多(拆表操作)==
     1. 将一对一的情况，当作是一对多情况处理，在任意一张表添加一个外键，并且在这个外键要唯一，指向另外一张表
     2. 直接合并成一张表
     3. 将两张表的主键建立起连接，让两张表里面的主键相等

### 主键约束

* 默认就是不能为空，唯一

* 外键都是指向另一张表的主键
* 主键

### 唯一约束

* 列表的内容必须是唯一，不能出现重复，为空

* 不可以作为其他表的外键

### 交叉链接查询

==笛卡尔积==

```sql
select * from 表名;
select * from 表名;
-- 笛卡尔积，查出来的是两表的乘积，没有意义
select * from 表名,表名;
-- 过滤出有意义的数据
select * from 表1 as b1,表2 as b2 where b1.主键=b2.主键;
-- 省略 as 关键字
select * from 表1 b1,表2 b2 where b1.主键=b2.主键;
```

### 内建链接查询

```sql
-- 隐式内链接
select * from 表1 别1,表2 别2 where 别1.主键=别2.主键;
-- 显示内链接
select * from 表1 别1 inner join 表2 别2 on 别1.主键=别2.主键;
-- 区别：
--	隐式内链接：在查询出结果的基础上做的 where 条件过滤
--	显示内链接：带着条件去查询结果，执行效率更高
```

### 左外链接

```sql
-- 左外链接：会将左表中的所有数据都查出来，如果右表没有对应的数据，则用 null 代替
select * from 表1 别1 left outer join 表2 别2 on 别1.主键=别2.主键;
```

### 右外链接

```sql
-- 右外链接
select * from 表1 别1 right outer join 表2 别2 on 别1.主键=别2.主键;
```

## 分页查询

关键字： ==limit== ==offset==

```sql
-- 起始索引为0
select * from 表名 limit 页数索引 offset 查询数量;
```

## Timestamp时区问题

> time_zone 时间是system 即跟随系统
>
> jdbc:mysql://34.92.22.157/monako?serverTimezone=GMT%2B8

__1、查看系统时区：__

```shell
date -R
# Thu, 13 Feb 2020 23:50:12 +0000 默认是美国时区
```

__2、修改Linux系统时区：__

```shell
# 修改成上海时区
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 查看
date -R
# Thu, 13 Feb 2020 23:50:12 +0800
```

__3、重启数据库：__

```shell
systemctl restart mysqld.service
# 查看mysql时区 变成了cst(中国时区)
mysql> show variables like "%time_zone%";
+------------------+--------+
| Variable_name    | Value  |
+------------------+--------+
| system_time_zone | CST    |
| time_zone        | SYSTEM |
+------------------+--------+
2 rows in set (0.01 sec)
mysql> 
```

