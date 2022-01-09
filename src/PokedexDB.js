const  {MongoClient} = require("mongodb");
const axios = require("axios").default;




const uri = "mongodb://localhost:27017";

async function main() {


GetDataFromApi();





}

main().catch(console.error);

function GetDataFromApi(){
    const options = {
        method: 'GET',
        url: 'https://pokedex2.p.rapidapi.com/pokedex/fr',
        headers: {
            'x-rapidapi-host': 'pokedex2.p.rapidapi.com',
            'x-rapidapi-key': 'e4bab4ecd0msh7f8138ac00facbap1708bdjsn3ded31c06b0c'
        }
    };

    axios.request(options)
        .then(async function (response) {
            console.log(response.data);
            await dbQueries(uri,mapData(response.data));



        }).catch(function (error) {
        console.error(error);
    });
}

async function dbQueries(uri,data){
   const client = new MongoClient(uri);

   try {
       await client.connect();

       await insertPokedex(client,data);
       await listDatabases(client);

   }
   catch (e) {
       console.error(e);
   }
   finally {
       await client.close();
   }
}


 function  mapData(data){

     let pokemonArray = JSON.parse(JSON.stringify(data));
     console.log(typeof(pokemonArray));
    return pokemonArray;



}

async function insertPokedex(client,data){

    const result = await client.db("Pokedex").collection("pokemon").insertMany(data);
    console.log(`${result.insertedCount}`);
    console.log(result.insertedIds);


}

async function listDatabases(client){
    const databaseList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(`-${db.name}`));


}