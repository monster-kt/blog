/*
 * @Date: 2021-03-24 09:58:58
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 17:21:42
 * @FilePath: \VSwork\Node\blog\middleware\loginGuard.js
 * @Descripttion:登陆拦截
 * @version:1.0
 * @Author: surui
 */
const guard = (req, res, next) => {
    // 判断用户访问的是否是登陆页面
    // 判断用户的登陆状态
    // 如果用户是登陆的 继续向下中间件
    // 如果不是登录的 重定向到登陆页
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 普通用户不准进入博客后台
        if (req.session.role == 'normal')
            return res.redirect('/home/');
        next();
    }
}
module.exports = guard;