/*
 * @Date: 2021-03-24 10:37:25
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 17:18:14
 * @FilePath: \VSwork\Node\blog\route\admin\login.js
 * @Descripttion:登陆功能路由处理模块
 * @version:
 * @Author: surui
*/
// 引入模块
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // 二次验证 因为客户端可以禁用JavaScript代码
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0)
        // return 禁止向下执行
        return res.status(400).render('admin/error', { msg: '密码或邮箱错误' });
    let user = await User.findOne({ email });

    if (user) {
        // 比对密码
        let isEqual = await bcrypt.compare(password, user.password);
        // 登陆成功
        if (isEqual) {
            // 将用户名存储在请求对象中的session中
            req.session.username = user.username;
            req.session.role = user.role;
            // 将公共数据开放到模板当中
            // req.app 就是 app.js 中的 app
            req.app.locals.userInfo = user;

            // 判断用户角色
            if (user.role == 'admin') {
                // 重定向到用户列表页
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }

        } else {
            res.status(400).render('admin/error', { msg: '密码或邮箱错误' });
        }
    } else {
        res.status(400).render('admin/error', { msg: '密码或邮箱错误' });
    }
}
