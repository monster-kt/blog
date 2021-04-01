/*
 * @description:删除用户功能路由模块
 * @version:1.0
 * @Date: 2021-03-30 09:41:34
 * @LastEditors: surui
 * @LastEditTime: 2021-03-30 10:08:40
 * @FilePath: \VSwork\Node\blog\route\admin\user-delete.js
*/
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    await User.findOneAndDelete({ _id: req.query.id });
    res.redirect('/admin/user');
}