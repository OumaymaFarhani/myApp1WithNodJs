var mongoose = require('mongoose');
//pour utiliser une classe de schema

var Schema = mongoose.Schema;


var User = new Schema({
    LoginUser : String,
    Password : String
})

module.exports = mongoose.model('login',User);
