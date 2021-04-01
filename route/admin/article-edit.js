/*
 * @description:文章编辑页面
 * @version:1.0
 * @Date: 2021-03-30 09:57:21
 * @LastEditors: surui
 * @LastEditTime: 2021-03-31 17:05:37
 * @FilePath: \VSwork\Node\blog\route\admin\article-edit.js
*/
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    req.app.locals.currentLink = 'article';
    const id = req.query.id;
    if (id) {
        let article = await Article.findOne({ _id: id });
        // 有id说明是编辑文章
        res.render('admin/article-edit', {
            article,
            link: `/admin/article-modify?id=${id}`,
            button: '修改'
        });
    } else {
        // 无id参数说明是添加文章
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
} 