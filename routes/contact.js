var express = require('express');
var router = express.Router();
var Contact = require("../model/contact")
const {models} = require("mongoose");
/* GET users listing. */
router.get('/', function(req, res, next) {
    Contact.find(function (err,data){
        if(err) throw err;
        //res.render("getAllContact.twig");

    res.render("getAllContact.twig",{data});
    });
});


//Display form add page
router.get('/add', function(req, res, next) {
    res.render("addContact.twig");
});

//Ajouter Contact
router.post('/addAction', function(req, res, next) {
   console.log(req.body);

   var contact = new Contact({
       FullName : req.body.FullName,
           Phone : req.body.Phone
    })
    contact.save();
   res.redirect('/contact/')
});

//delete contact

router.get('/delete/:id',function (req,res,next){
    //lire id dans l url
    var id = req.params.id;
    Contact.findOneAndRemove({_id:id},(err)=>{
        if(err) throw err;
    })
    res.redirect('/contact');

});

//methode rechercher

router.get('/search',(req,res)=>{
    try {
        Contact.find({$or:[{FullName:{'$regex':req.query.search}},{Phone:{'$eq':req.query.search}}]},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.render('getAllContact.twig',{data:data});
            }
        })
    } catch (error) {
        console.log(error);
    }
});


//modifier contact


router.get('/update/:id',(req,res,next)=>{
    var id =req.params.id;
    Contact.findById({_id:id},(err,data)=>{
        if(err) throw err;

        res.render("modifier.twig",{data});

    })
})
/*
router.post('/update/:id',function (req,res,next){
    //lire id dans l url

    var id = req.params.id;


    Contact.findOneAndUpdate({_id:id},(err,data)=>{
        if(err) throw err;
        FullName : req.body.fullname;
        Phone : req.body.phone;
    });
    req.save();
    res.redirect('/contact');




});

*/
/*
router.post('/update/:id',function (req,res,next) {
    var id = req.params.id;
    console.log(id)
    var data ={
        FullName : req.body.FullName,
        Phone : req.body.Phone
    }
    Contact.findByIdAndUpdate({_id:id},data,(err)=>{
        if(err) throw err ;
    })
    res.redirect("/contact")

});

*/
/* 1er methode update
router.post('/update/:id',function (req,res,next) {
    var id = req.params.id;
    console.log(id)
    var data ={
        FullName : req.body.FullName,
        Phone : req.body.Phone
    }
    Contact.findByIdAndUpdate({_id:id},data,(err)=>{
        if(err) throw err ;
    })
    res.redirect("/contact")

})

*/
//deuxieme methode update
router.post('/update',function (req,res,next) {
    let id = req.body.id;

    Contact.findById({_id:id},function (err,doc){
        doc.FullName=req.body.FullName;
        doc.Phone=req.body.Phone;
        doc.save();
    });
    res.redirect("/contact/")

})




module.exports = router;
