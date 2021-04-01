/*
 * @description:用户信息修改功能模块
 * @version:1.0
 * @Date: 2021-03-26 14:29:51
 * @LastEditors: surui
 * @LastEditTime: 2021-03-30 19:23:00
 * @FilePath: \VSwork\Node\blog\route\admin\user-modify.js
*/
const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;
    let user = await User.findOne({ _id: id });
    // 密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        await User.updateOne({ _id: id }, { username, email, role, state });
        res.redirect('/admin/user');
    } else {
        let obj = { path: '/admin/user-edit', message: '密码输入错误，不能进行修改', id }
        next(JSON.stringify(obj));
    }
}