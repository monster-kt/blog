/*
 * @description:文章详情页
 * @version:1.0
 * @Date: 2021-03-31 17:59:10
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 19:49:22
 * @FilePath: \VSwork\Node\blog\route\home\article.js
*/
const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 用户点击进入详情页时 将用户的id传过来
    const id = req.query.id;
    // 查询该文章的评论信息
    let comment = await Comment.find({ aid: id }).populate('uid').lean();
    let article = await Article.findOne({ _id: id }).populate('author').lean();
    res.render('home/article', {
        article, comment
    });
}