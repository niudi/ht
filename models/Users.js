var mongoose = require("mongoose");
module.exports = mongoose.model("Users",{
	"id":Number,
	"name":String,
	"password":String
	
})