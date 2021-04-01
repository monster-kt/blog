/*
 * @Date: 2021-03-22 14:03:43
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 17:46:57
 * @FilePath: \VSwork\Node\blog\route\home.js
 * @Descripttion: 展示页面路由
 * @version: 1.0
 * @Author: surui
*/

const express = require('express');
const home = express.Router();

// 博客首页展示页面
home.get('/', require('./home/default'));

// 博客文章详情展示页面
home.get('/article', require('./home/article'));
// 评论功能路由
home.post('/comment', require('./home/comment'));
module.exports = home;