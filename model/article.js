/*
 * @description:文章集合
 * @version:1.0
 * @Date: 2021-03-30 10:31:37
 * @LastEditors: surui
 * @LastEditTime: 2021-04-11 19:49:50
 * @FilePath: \VSwork\Node\blog\model\article.js
*/
const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题'],
        minlength: 2,
        maxlength: 60
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    // 作者是用户集合中的用户  所以需要进行关联
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})
const Article = mongoose.model('Article', articleSchema);
// 初始化
/* article.create({
    title: 'JavaScript基础一：基本介绍',
    author: '60598c517e0b411144b8895f',
}).then(()=>console.log('创建文章成功'))
    .catch((err)=>console.log('创建文章失败',err));
 */
module.exports = { Article };