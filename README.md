## 功能说明：
现阶段完成的功能有：登陆拦截，发表评论，上传文章，管理员功能：用户信息的增加删除和修改，博客文章的增加删除和修改。
## 使用技术
后台采用Node.js，使用express框架。前台采用div+css布局，使用jQuery，使用bootstrap框架进行样式优化。
## 使用说明
1. clone到本地后，修改数据库文件（config/production.json），参照config/development.json文件中的格式，添加自己本地的数据库信息，进行连接。
2. 运行服务器（node app.js）
3. 使用管理员账号（username：su@163.com；passwor：123456），进行登陆，所有用户的密码都为123456，可以在数据库中查看其他用户的信息。
4. 管理员登陆默认进入后台页面，其他普通用户默认进入博客首页且不能进入后台。
5. 博客首页的url为（localhost/home），博客后台url为（localhost/admin/user）
