var mongoose = require("mongoose");
module.exports = mongoose.model("News",{
	"id":Number,
	"delete":String,
	"intro":String,
	"title":String,
	"type":String,
	"listimg":String,
	"content":String,
	"date":Number,
	"author":String,
	"browse":String
})