var express = require('express');
var pool = require("../config/config");
var router = express.Router();

/* GET users listing. */

// Additional middleware which will set headers that we need on each request.
router.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/users', function(req, res, next) {
  res.send('is users');
});

//读取笔记
router.get('/getdata', function(req, res, next){
    pool.getConnection(function (err,connection) {
        connection.query('SELECT * FROM webnote order by id asc', function (error, results, fields) {
            connection.release();//释放空间
            res.send(results);
            // res.render("comments",{list:results});
        });
    })
});

//添加笔记
router.post('/adddata', function(req, res, next){
    // console.log(req.body.title);
    var title=req.body.title;
    var markdown=req.body.markdown;
    var date=req.body.date;
    var sql='INSERT INTO `webnote` (`title`,`markdown`,`date`) VALUES ('+"'"+title+"'"+','+"'"+markdown+"'"+','+"'"+date+"'"+')';
    pool.getConnection(function (err,connection) {
        connection.query(sql, function (error, results, fields) {//添加比较
            connection.query('SELECT * FROM webnote order by id desc', function (error, results, fields) {//读取比较
            connection.release();//释放空间
            console.log("笔记添加成功");
            res.send(results);
           // res.send(results);
            // res.render("comments",{list:results});
        });
            });
    })
});
//修改笔记
router.post('/edit/:id', function(req, res, next){
    var ids=req.params;
    // console.log(ids.id);
    var title=req.body.title;
    var markdown=req.body.markdown;
    pool.getConnection(function (err,connection) {
        var sql='update `webnote` set `title`=?,`markdown`=? where id='+ids.id;
        connection.query(sql,[title,markdown],function (error,results,fields) {//修改笔记
            connection.query('SELECT * FROM webnote order by id desc', function (error, results, fields) {//读取笔记
            connection.release();//释放空间
            console.log("修改笔记成功");
            res.send(results);
            });
        });
    });
});
//删除笔记
router.post('/del/:id', function(req, res, next){
    var ids=req.params;
    // console.log('进入删除模式'+ids.id);
    pool.getConnection(function (err,connection) {
         connection.query("delete from `webnote` where id="+ids.id,function (error,results,fields) {//删除比较
             connection.query('SELECT * FROM webnote order by id desc', function (error, results, fields) {//读取笔记
            connection.release();
            console.log("删除笔记成功");
             res.send(results);
             });
        });
   });

});


module.exports = router;
