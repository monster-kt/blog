/*
 * @Date: 2021-03-22 15:26:17
 * @LastEditors: surui
 * @LastEditTime: 2021-03-31 15:05:51
 * @FilePath: \VSwork\Node\blog\model\connect.js
 * @Descripttion:数据库连接
 * @version:1.0
 * @Author: surui
 */
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(err => {
        console.log('连接失败', err);
    });
