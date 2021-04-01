/*
 * @Date: 2021-03-22 16:34:17
 * @LastEditors: surui
 * @LastEditTime: 2021-03-22 18:56:21
 * @FilePath: \VSwork\Node\blog\public\admin\js\common.js
 * @Descripttion:公共js方法
 * @version:1.0
 * @Author: surui
 */
function serializeToJson(form) {
    var res = {};
    /**
        * @description: 获取表单中用户输入的内容
        * @param {}
        * @return {Array} [{name:'',value:'用户输入的内容'}]
        * @author: jquery
        * @name: serializeArray
    */
    var f = form.serializeArray();
    f.forEach(function (item) {
        res[item.name] = item.value;
    });
    return res;
}