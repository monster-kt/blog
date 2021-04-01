/*
 * @description:渲染首页
 * @version:1.0
 * @Date: 2021-03-31 14:47:23
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 15:56:51
 * @FilePath: \VSwork\Node\blog\route\home\default.js
*/
const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page;
    let temp = await pagination(Article).find().page(page).size(4).display(3).populate('author').exec();
    let str = JSON.stringify(temp);
    let articles = JSON.parse(str);
    res.render('home/default', { articles });
}