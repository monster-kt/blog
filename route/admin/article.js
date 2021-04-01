/*
 * @description:文章列表页路由模块
 * @version:1.0
 * @Date: 2021-03-30 09:53:56
 * @LastEditors: surui
 * @LastEditTime: 2021-04-01 16:05:58
 * @FilePath: \VSwork\Node\blog\route\admin\article.js
*/

const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块  采用第三方模块的方法实现分页
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 标识当前访问的是文章管理页面
    req.app.locals.current = 'article';

    // 接收客户端传递的页码
    const page = req.query.page;

    /*在分页之前出现的 显示页面的  坑
        在mongoose中使用 popular 方法实现集合关联时，导致模板引擎无法渲染
        当集合联合查询和渲染页面模板同时进行会导致两者冲突，从而导致无法渲染页面
        解决方法1：使用lean()方法
        解决方法2：使用stringfy（）和 parse（）方法
        详见blog：https://www.cnblogs.com/Monster-su/p/14600047.html
    */
    /**
     @page 当前页
     @size 每页显示的数据条数
     @display 指定客户端显示的页码数量
     @exec  向数据库中发送查询请求
    **/
    let temp = await pagination(Article).find({})
        .page(page)
        .size(2)
        .display(2).populate('author')
        .exec();
    let str = JSON.stringify(temp);
    let articles = JSON.parse(str);
    res.render('admin/article', { articles });
}