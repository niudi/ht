var express = require("express");
var app = express();
var mongoose = require("mongoose");
var formidable = require("formidable");
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false})); 
// app.use(bodyParser.json())
app.use(bodyParser.json({limit:"5mb"}));

// var dburl = "mongodb://hxjf:hxjf@172.16.101.231:27017/hxjf";
mongoose.connect("mongodb://hxjf:hxjf@172.16.101.231:27017/hxjf");
// mongoose.connect("mongodb://127.0.0.1/test")
var News = require("./models/News.js");
var Users = require("./models/Users.js");

// var Foos = require("./models/Foos.js");


/*var db = mongoose.connection;
db.on("open",(callback)=>{
    Foos.find({}).exec(function(err,docs){
        // res.json({"allnews":docs});
        console.log(docs)
    })
    console.log("lianjie成功")
});
db.on("error",console.error.bind(console,"链接错误"));*/

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "127.0.0.1");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", '3.2 .1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});





/*
app.get("/foo",function(req,res){
    Foos.find({}).exec(function(err,docs){
        res.json({"allnews":docs});
        console.log(docs)
    })
})*/

// 拿到所有新闻
app.get("/allnews",function(req,res){
 
    News.find({"delete":"false"}).sort({"date":-1}).exec(function(err,docs){
        res.json({"allnews":docs})
    })
});
// 拿到单个新闻详情
app.get("/news/:id",function(req,res){
	var id = req.params.id;
	News.find({id}).exec(function(err,docs){
		res.json({"news":docs[0]})
	})
})
// 拿到所有用户
app.get("/users",function(req,res){
 
    Users.find({"delete":"false"}).sort({"id":-1}).exec(function(err,docs){
        res.json({"users":docs})
    })
});
// post查找用户
app.post("/usersCheck",function(req,res){
	var form = new formidable.IncomingForm();
	var login = req.query;

	 Users.find(login).exec((err,docs)=>{
	 	console.log(docs)
		if(docs==""){
			res.json({"code":"1","msg":"用户名或密码出错"})
		}else{
			res.json({"code":"0","msg":"success"})
		}
	});
	
});
// 添加新闻内容：
app.post("/addnews",function(req,res){
   	News.find({}).sort({"date":-1}).exec(function(err,docs){
        	var id = docs[0].id+1;
        	var obj={
        		"id":id,
                "delete":"false",
                "intro":req.body.intro,
                "title":req.body.title,
                "content":req.body.content,
                "listimg":req.body.listimg,
                "date":req.body.date,
                "author":req.body.author,
                "type":req.body.type,
        		"browse":0
        	};
            console.log(req.body.intro)
        	News.create(obj,function(){
				res.json({"code":"0","msg":"success"})
        	})
    	})

})
// 删除新闻
app.post("/delnews/:id",function(req,res){
    var id = req.params.id;
    News.update({"id":id},{"$set":{"delete":"true"}},(err)=>{
       if(!err) console.log("删除成功"); 
    })
    res.json({"code":"0","msg":"success"})
})
// post修改新闻
app.post("/updatenews/:id",function(req,res){
    var id = req.params.id;
    var obj={
                "id":id,
                "delete":"false",
                "intro":req.body.intro,
                "title":req.body.title,
                "content":req.body.content,
                "listimg":req.body.listimg,
                "date":req.body.date,
                "author":req.body.author,
                "type":req.body.type,
                "browse":0
            };
    console.log(id);
    News.remove({"id":id},(err)=>{
        if(!err){

          News.create(obj,function(){
                res.json({"code":"0","msg":"success"})
            })
        }
    });
    // res.json({"code":"0","msg":"success"})
})




app.listen(3000);