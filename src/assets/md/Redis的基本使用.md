# Redis的基本使用

#### 1. 编译

```shell
cd redis/
make
make install
```

#### 2. 配置环境变量

```bash
vim /etc/profile
...
export PATH=${PATH}:/usr/local/redis/src
```

### 3. 更新环境变量

```bash
source /etc/profile
```

#### 4. 修改配置，默认启动就后台运行

```shell
# 找到redis.conf 并修改 daemonize no 为 daemonize yes 
vim redis/redis.conf
```

#### 5. 启动 redis 服务

```shell
redis-server redis/redis.conf
```

#### 6. 基础使用

```shell
# 进入客户端
redis-cli
# 设置 key value
set key value
# 获取 value
get key
# 获取 key
get keys
# 删除
del key
```

#### 7. 事务

__1. 在窗口1开启事务，多次累加数据__

![](http://www.monako.club:8060/images/497280b8-83be-4f0b-9f2b-ea997cfc0aa020200207135245.png)

__2. 在窗口2中获取值__

![](http://www.monako.club:8060/images/1daa6ad8-8746-4e56-aa0b-ed30e9129bd820200207135521.png)

__3. 在窗口1中提交事物__

回滚：discard

![image-20200207135716868](http://www.monako.club:8060/images/08d1c537-0612-4d3f-9042-c55fa652ebadimage-20200207135716868.png)

__4. 在窗口2中获取值__

![](http://www.monako.club:8060/images/1fcd69fc-422c-4e7c-b664-7ab4bf2449e320200207135751.png)