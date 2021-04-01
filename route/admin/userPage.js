/*
 * @Date: 2021-03-24 10:46:19
 * @LastEditors: surui
 * @LastEditTime: 2021-03-30 10:19:57
 * @FilePath: \VSwork\Node\blog\route\admin\userPage.js
 * @Descripttion:渲染用户列表页路由处理模块
 * @version:1.0
 * @Author: surui
*/
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 当前访问的是用户列表页
    req.app.locals.current = 'user';
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    const pagesize = 2;
    // 查询数据总数 第一个参数为查询条件
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    // 页码对应的开始位置
    let start = (page - 1) * pagesize;

    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user', { users, page, total });
}