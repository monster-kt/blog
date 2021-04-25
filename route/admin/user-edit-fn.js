/*
 * @Date: 2021-03-24 11:05:29
 * @LastEditors: surui
 * @LastEditTime: 2021-04-12 15:54:14
 * @FilePath: \VSwork\Node\blog\route\admin\user-edit-fn.js
 * @Descripttion:用户添加功能路由处理函数
 * @version:1.0
 * @Author: surui
*/

const { User, vaildateUser } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 实施验证
    try {
        await vaildateUser(req.body);
    } catch (e) {
        // JSON.stringify() 将对象转换为字符串数据类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }
    // 查询邮箱 添加用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(JSON.stringify({ path: 'admin/user-edit', message: '用户已经存在' }));
    } else {
        // 密码加密
        let salt = await bcrypt.genSalt(10);
        let pass = await bcrypt.hash(req.body.password, salt);
        req.body.password = pass;
        await User.create(req.body);
        return res.redirect('/admin/user');
    }
}