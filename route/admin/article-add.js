/*
 * @description:增加文章
 * @version:1.0
 * @Date: 2021-03-30 11:12:33
 * @LastEditors: surui
 * @LastEditTime: 2021-03-30 19:20:35
 * @FilePath: \VSwork\Node\blog\route\admin\article-add.js
*/
// 引入formidable第三方模块
const formidable = require('formidable');
// 引入系统模块
const path = require('path');
// 引入自定义模块
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    req.app.locals.currentLink = 'article';
    
    // 创建表单解析对象
    var form = new formidable.IncomingForm();
    // 配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 是否保留表单上传文件的扩展名
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
        if (err) throw err;
        const { title, author, publishDate, content } = fields;
        await Article.create({
            title, author, publishDate,
            //  只保存相对于客户端的路径
            cover: files.cover.path.split('public')[1],
            content
        });
        res.redirect('/admin/article');
    });
}