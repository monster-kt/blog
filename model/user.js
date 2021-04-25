/*
 * @Date: 2021-03-22 15:26:24
 * @LastEditors: surui
 * @LastEditTime: 2021-04-12 15:52:23
 * @FilePath: \VSwork\Node\blog\model\user.js
 * @Descripttion:创建用户集合
 * @version:1.0
 * @Author: surui
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlenth: 8
    },
    email: {
        type: String,
        required: true,
        // 保证邮箱地址不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用
    // 1 禁用
    state: {
        type: Number,
        defalut: 0
    }
});

const User = mongoose.model('User', userSchema);

/*async function createUser() {
    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash('123456', salt);
    let user = await User.create({
        username: 'su',
        password: pass,
        email: 'su@163.com',
        role: 'admin'
    })
}
createUser();*/
// 初始化一个用户以创建数据库和集合
/* User.create({
    username: 'su',
    email: 'su@163.com',
    password: '123456',
    role: 'admin'
})
    .then(() => {
        console.log('用户创建成功')
    })
    .catch(err => {
        console.log('用户创建失败', err);
    }) */

// 封装验证用户信息函数
const vaildateUser = user => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum().min(2).max(8)
            .required().error(new Error('用户名输入不正确')),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required().error(new Error('邮箱输入不正确')),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,10}$/)
            .required().error(new Error('密码输入不正确')),
        role: Joi.string()
            .valid('normal', 'admin').error(new Error('角色输入不正确')),
        state: Joi.number()
            .valid(0, 1).error(new Error('状态输入不正确'))
    });
    return schema.validateAsync(user);
}

module.exports = {
    // 键和值一样，可以只写一个
    User,
    vaildateUser
};