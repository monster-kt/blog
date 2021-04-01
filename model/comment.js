/*
 * @description:评论集合
 * @version:1.0
 * @Date: 2021-04-01 16:38:43
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 19:48:00
 * @FilePath: \VSwork\Node\blog\model\comment.js
*/
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});
// 创建评论集合
const Comment = mongoose.model('Conmment', commentSchema);
module.exports = {
    Comment
}