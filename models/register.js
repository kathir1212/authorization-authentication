const mongoose = require("mongoose");


const registerschema = new mongoose.Schema({

name : {
    type: String,
    required: true,
},

 email : {
    type: String,
    required: true,
},
password : {
    type: String,
    required: true,
}







});


const register = mongoose.model("user", registerschema);


module.exports = register;

