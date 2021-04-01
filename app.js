/*
 * @Description:入口文件 主文件
 * @Version: 1.0
 * @Autor: ksr
 * @Date: 2021-03-22 13:24:48
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 19:55:46
 * @FilePath: \VSwork\Node\blog\app.js
*/
// 引入express框架
const express = require('express');
// 引入路由
const home = require('./route/home');
const admin = require('./route/admin');
// 引入系统模块
const path = require('path');

// 引入第三方模块
const bodyParser = require('body-parser');
const session = require('express-session');
const dateformat = require('dateformat');
const { template } = require('express-art-template');
const morgan = require('morgan');


// 引入数据库模块
require('./model/connect');
// 导入的时候会同时执行文件

// 创建网站服务器
const app = express();

// 处理post请求参数  但不能处理二进制数据
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session 
app.use(session({
    secret: 'secret key',
    // 保存一个未初始化的值
    saveUninitialized: false,
    cookie: {
        // 以毫秒为单位 * 1000 设置过期时间为1天
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 静态资源配置
app.use(express.static(path.join(__dirname, 'public')));

// 模板配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
// 向模板内部导入dateFormat变量
template.defaults.imports.dateformat = dateformat;

// 生产环境与开发环境设置
// process.env 获取系统环境变量 返回一个对象
if (process.env.NODE_ENV == 'development') {
    // 将客户端请求打印到控制台
    app.use(morgan('dev'));
} else {
    console.log('生产环境');
}

// 拦截请求 判断用户登陆状态
// 这个 /admin 是admin开头的
app.use('/admin', require('./middleware/loginGuard'));

// 路由匹配
app.use('/home', home);
app.use('/admin', admin);

// 错误处理
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    // `/admin/user-edit?message=${e.message}`
    let params = [];
    // attr obj 的属性
    for (let attr in result) {
        if (attr !== 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口
app.listen(80);
console.log('网站服务器启动成功');