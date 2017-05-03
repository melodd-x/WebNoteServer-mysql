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
