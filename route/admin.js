/*
 * @Date: 2021-03-22 14:21:35
 * @LastEditors: surui
 * @LastEditTime: 2021-03-31 16:33:18
 * @FilePath: \VSwork\Node\blog\route\admin.js
 * @Descripttion:管理页面路由
 * @version:1.0
 * @Author: surui
*/
// 引入框架
const express = require('express');

// 创建路由对象
const admin = express.Router();

// 渲染登陆页面 
admin.get('/login', require('./admin/loginPage'));

// 实现登陆功能
admin.post('/login', require('./admin/login'));

// 服务器端重启的时候 客户端的cookie会失效 需要重新登陆
admin.get('/user', require('./admin/userPage'));

admin.get('/loginout', require('./admin/loginOut'));

// 渲染用户编辑页
admin.get('/user-edit', require('./admin/user-edit'));
// 添加用户功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
// 修改用户
admin.post('/user-modify', require('./admin/user-modify'));
// 删除用户
admin.get('/user-delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
// 文章修改
admin.post('/article-modify', require('./admin/article-modify'));
// 文章添加
admin.post('/article-add', require('./admin/article-add'));
// 文章删除
admin.get('/article-delete', require('./admin/article-delete'));

module.exports = admin;