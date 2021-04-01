/*
 * @description:文章删除功能模块
 * @version:1.0
 * @Date: 2021-03-31 12:07:13
 * @LastEditors: surui
 * @LastEditTime: 2021-03-31 17:43:47
 * @FilePath: \VSwork\Node\blog\route\admin\article-delete.js
*/
const { Article } = require('../../model/article');
const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
    // 还要删除在服务器中的图片
    let { cover } = await Article.findOne({ _id: req.query.id });
    fs.unlink(path.join(__dirname, '../', '../', 'public', cover), function (error) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('删除文件成功');
    });
    await Article.findOneAndDelete({ _id: req.query.id });
    res.redirect('/admin/article');
}