/*
 * @description:评论功能
 * @version:1.0
 * @Date: 2021-04-01 17:46:49
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 19:49:47
 * @FilePath: \VSwork\Node\blog\route\home\comment.js
*/
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    let { aid, uid, content } = req.body;
    await Comment.create({ aid, uid, content, time: new Date() })
    res.redirect('/home/article?id=' + aid);
}