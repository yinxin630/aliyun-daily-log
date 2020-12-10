# aliyun-daily-log

在阿里云服务器上配置 `sendmail` 一直不成功, 联系售后工程师也没能解决, 所以写了这个才实现需求

支持每日零点获取 logwatch 日志并通过 163 SMTP 发邮件到指定邮箱

## 配置

在根目录下创建 `.env` 文件, 支持如下配置

```
User=163账号
Pass=163授权密码
From=发件人和发件邮箱, 邮箱要和 User 配置一致
To=收件人, 多个用逗号隔开
```

## 运行

需要 node 和 yarn

``` bash
# 安装依赖
yarn install

# 直接运行
yarn start

# 使用 pm2 运行
pm2 start yarn --name aliyun-daily-log -- start
```
