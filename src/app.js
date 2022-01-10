
const  {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pokemon = require("ejs");
const app = express();

let messages = [];

app.use(bodyParser.urlencoded({extended:false}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('views','./views');

app.get('',async function (req, res) {
    let listPokemon = await getDataFromDB();
    let name= [];
    let id= [];
    let type = [];
    let thumbnail = [];
    listPokemon.forEach((pokemon,index)=>{
        name.push(pokemon.name);
        id.push(pokemon.id);
        type.push(pokemon.type);
        thumbnail.push(pokemon.ThumbnailImage);


    });
    res.locals.pkmnName = name;
    res.locals.pkmnId = id;
    res.locals.pkmnType = type;
    res.locals.pkmnThumbnail=thumbnail;
    res.render('ListPokemon.ejs');



});
app.post('/',function (req,res){
   messages.push({
       title: req.body.title,
       message: req.body.message
   }) // à changer par les champs du formulaire
   res.redirect('/');
});
app.listen(3001,async function () {

    const data = await getDataFromDB();





});


async function getDataFromDB(){
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const result = await client.db("Pokedex").collection("pokemon").find({}).toArray();
        const pokemonArray = result;
        console.log(pokemonArray);
        return pokemonArray;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
