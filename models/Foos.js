var mongoose = require("mongoose");
module.exports = mongoose.model("Foos",{
	"id":Number,
	"title":String,
	"type":String,
	"listimg":String,
	"content":String,
	"date":Number,
	"author":String,
	"browse":String
	
})