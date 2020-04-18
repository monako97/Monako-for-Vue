[TOC]

# CentOS7安装最新版Nginx

## 1、安装所需插件

1. __安装gcc__

```shell
# 查看gcc版本 
gcc -v
# 没有的话执行安装命令
yum -y install gcc
```

2. __安装pcre、pcre-devel__

```shell
yum install -y pcre pcre-devel
```

3. __安装zlib__

```shell
yum install -y zlib zlib-devel
```

4. __安装openssl__

```shell
yum install -y openssl openssl-devel
```

## 2、安装Nginx

1. __下载最新版Nginx__

```shell
wget http://nginx.org/download/nginx-1.17.7.tar.gz
```

2. __解压缩__

```shell
tar -zxvf nginx-1.17.7.tar.gz
```

3. __编译__

```shell
cd nginx-1.17.7/
./configure
make
make install
```

4. __配置环境变量__

```shell
vim /etc/profile
...
export PATH=${PATH}:/usr/local/nginx/sbin
```

5. __重新加载__

```shell
source /etc/profile
```

6. __验证安装__

```shell
nginx -v
```

## 3、开机自启

1. __编辑rc.local文件__

```shell
vi /etc/rc.local
...
/usr/local/nginx/sbin/nginx
```

2. __修改权限__

```shell
chmod 755 /etc/rc.local
```

## 4、修改防火墙

```shell
sudo firewall-cmd --permanent --zone=public --add-service=http 
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
# 开启端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --zone=public --add-port=22/tcp --permanent
# 命令含义
--zone #作用域
--add-port=80/tcp #添加端口，格式为：端口/通讯协议
--permanent #永久生效，没有此参数重启后失效
# 重载防火墙配置
firewall-cmd --reload
# 设置开机启动
systemctl enable firewalld
```

