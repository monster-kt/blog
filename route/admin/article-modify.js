/*
 * @description:文章修改功能路由
 * @version:1.0
 * @Date: 2021-03-31 16:33:31
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 20:09:11
 * @FilePath: \VSwork\Node\blog\route\admin\article-modify.js
*/
const { Article } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');

module.exports = async (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 是否保留表单上传文件的扩展名
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
        if (err) throw err;
        // 作者不允许修改
        const { title, publishDate, content } = fields;
        await Article.updateOne({ _id: req.query.id }, {
            title, publishDate,
            // 只保存相对于客户端的路径
            cover: files.cover.path.split('public')[1],
            content
        });
        res.redirect('/admin/article');
    });
}