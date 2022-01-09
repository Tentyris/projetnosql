
const  {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let messages = [];

app.use(bodyParser.urlencoded({extended:false}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views',path.join(__dirname,'views'));

app.get('/',function (req,res){
    res.render('index.html');
});
app.post('/',function (req,res){
   messages.push({
       title: req.body.title,
       message: req.body.message
   }) // à changer par les champs du formulaire
   res.redirect('/');
});
app.listen(3000,function (){
    console.log('blyat')
});