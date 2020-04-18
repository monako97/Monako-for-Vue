# Firewalld的基本使用

**启动** 

```shell
systemctl start firewalld
```

**查看状态**

```shell
systemctl status firewalld 
# 这个命令也可以，只是信息会简单点
firewall-cmd --state 
```

**停止**

```shell
systemctl stop firewalld
```

**禁用**

```shell
systemctl disable firewalld
```

**开启一个端口**

```shell
# 命令含义
--zone #作用域
--add-port=80/tcp #添加端口，格式为：端口/通讯协议
--permanent #永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=8080/tcp --permanent
```

**添加端口外部访问权限（这样外部才能访问）**

```shell
firewall-cmd --add-port=5005/tcp
```

**重新载入**

```shell
firewall-cmd --reload
```

**查看端口**

```shell
firewall-cmd --zone=public --query-port=80/tcp
```

**删除端口**

```shell
firewall-cmd --zone=public --remove-port=80/tcp --permanent
```

**查看firewall是否运行**

```shell
systemctl status firewalld
# 或
firewall-cmd --state
```

**查看开启了哪些服务**

```shell
systemctl status firewalld
```

**查看开启的端口**

```shell
firewall-cmd --list-ports
```

**查看还有哪些服务可以打开**

```shell
firewall-cmd --get-services
```

**查看所有打开的端口**

```shell
firewall-cmd --zone=public --list-ports
```

**更新防火墙规则**

```shell
firewall-cmd --reload
```

**查看端口访问权限情况**

```shell
firewall-cmd --query-port=8080/tcp
```

**锁定**

```shell
systemctl mask firewalld
```

**取消锁定**

```shell
systemctl unmask firewalld
```

