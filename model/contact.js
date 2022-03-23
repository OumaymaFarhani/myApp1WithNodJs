var mongoose = require('mongoose');
//pour utiliser une classe de schema

var Schema = mongoose.Schema;


var Contact = new Schema({
    FullName : String,
    Phone : Number
})

module.exports = mongoose.model('contact',Contact);
