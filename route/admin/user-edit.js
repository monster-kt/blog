/*
 * @Date: 2021-03-24 10:53:14
 * @LastEditors: surui
 * @LastEditTime: 2021-03-30 19:22:49
 * @FilePath: \VSwork\Node\blog\route\admin\user-edit.js
 * @Descripttion:用户编辑页面渲染功能模块
 * @version:
 * @Author: surui
*/
const { User, vaildateUser } = require('../../model/user');
module.exports = async (req, res) => {
    // 获取到地址栏中的id参数
    const { message, id } = req.query;
    // 有id说明是修改用户信息
    if (id) {
        // 修改操作
        let user = await User.findOne({ _id: id });
        // 渲染用户编辑页面
        res.render('admin/user-edit', {
            mesg: message, user,
            link: `/admin/user-modify?id=${id}`,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/user-edit', {
            mesg: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

}