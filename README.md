<h1 align=center >WebNoteServer</h1>

<h2 align=center >WebNoteServer-(Mysql)接口文档</h2>

- WebNote mysql存储服务器
- Author:汪潇凯
- Email:<melodd@yeah.net>


### 创建数据库
1. 用MAMP创建一个名为webnote的数据库
2. 在webnote的数据库里,创建一张名为webnote的表
3. 表里面的内容有`id`,`title`,`date`,`content`,`markdown`
4. 在后台里面config/config.js里面配置mysql
```js
var mysql = require('mysql');
var database_config={
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'webnote',
    port: '8889'
}
var pool=mysql.createPool(database_config);
module.exports=pool;
```
5. 在router/users.js写前后台交互


### 接口说明
1. 获取数据接口`http://127.0.0.1:7502/users/getdata`
2. 添加数据接口`http://127.0.0.1:7502/users/adddata`
3. 修改数据接口`http://127.0.0.1:7502/users//edit/:id`
4. 删除数据接口`http://127.0.0.1:7502/users//del/:id`


### 数据说明
- `id`:mysql数据库生成
- `title`:文章标题
- `date`:文章的创建时间或上传时间
- `content`:.md->html->文本,两次解析后的数据(根据需求是否需要)
- `markdown`: 用户输入的markdown内容
