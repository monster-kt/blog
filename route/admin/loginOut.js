/*
 * @Date: 2021-03-24 10:46:56
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 17:29:25
 * @FilePath: \VSwork\Node\blog\route\admin\loginOut.js
 * @Descripttion:退出功能路由处理模块
 * @version:
 * @Author: surui
 */
module.exports = (req, res) => {
    // 删除 session
    req.session.destroy(function () {
        // 删除 cookie
        res.clearCookie('connect.sid');
        // 删除 locals
        req.app.locals.userInfo = null;
        // 重定向到用户登录页面
        res.redirect('/admin/login');
    });
}