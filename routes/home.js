var express = require('express');
const User = require("../model/user");
const Contact = require("../model/contact");
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.render("getAllContact.twig");
});*/


//Display form add page
router.get('/', function(req, res, next) {
    res.render("home.twig");
});

router.get('/listUser', function(req, res, next) {
    User.find(function (err,data){
        if(err) throw err;
        //res.render("getAllContact.twig");

        res.render("getAllUser.twig",{data});
    });
});

router.get('/login', function(req, res, next) {
    res.render("auth.twig");

});




//Ajouter Contact
router.post('/auth', function(req, res, next) {
    console.log(req.body);

    var user = new User({
        LoginUser : req.body.LoginUser,
        Password : req.body.Password
    })
    user.save();
    res.redirect('/listUser')
});



router.get('/delete/:id',function (req,res,next){
    //lire id dans l url
    var id = req.params.id;
    User.findOneAndRemove({_id:id},(err)=>{
        if(err) throw err;
    })
    res.redirect('/listUser');

});

module.exports = router;
