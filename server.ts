
/**
 * Imports starts here!
 */

 const express = require('express');
 const bodyParser = require('body-parser'); // Learn
 const corsOrigin = require('./server-related/corsOrigin.ts');
 const data = require('./data/MOCK_DATA.json');
 const cors = require('cors');
 const app = require('express')();
 const port = 1234;
 const MongoClient = require('mongodb').MongoClient;

const geoCode = require('./Weather-app/geoCode.ts');
const foreCast = require('./Weather-app/foreCast.ts');

/**
 *  Imports ends here !!
 */

/**
 * let(s) are declared here.
 * ConnectionString : connects to the database's connection/(table like).
 */
let db;
let collections;
MongoClient.Promise = global.Promise;
let connectionString =
    'mongodb+srv://mani:7299728050O@cluster0-bgmld.mongodb.net/ProjectNode?retryWrites=true&w=majority';

/**
 cors origin and other use.
 */

app.use(cors(corsOrigin));
app.use(express.static('StaticFile'));
app.use(bodyParser.urlencoded({extended: true}));


/**
 * DB related block. DB: Mongo DB.
 * UnifiedTopology - Included to avoid the deprecated warnings.
 */

 MongoClient.connect(connectionString, {useUnifiedTopology: true}).then(client => {
         db = client.db('DB4NodeJs');
         collections = db.collection('SampleCollection');
         console.log("inside the db operation block");
     });

/**
 * DB related code block ends here!!
 */

/**
 App routes starts here.
 */
 app.get('/', (req, res) => {
   res.send("Hello");
 });

 app.get('/messages', (req, res) => {
     res.send(data);
 });

 app.get('/getMessages/:id', (req,res) => {
    collections.findOne({id: Number(req.params.id)},  (err, doc) => {
        console.log("fetched value", doc);
        res.send("Fetched the value successfully.");
    })
 });

/**
 * Weather app related express blocks..
 */

app.get('/weatherDetail/:cityName', (req, res) => {
     let cityName = req.params.cityName;
     geoCode(cityName, (error, data) => {
        foreCast(data , (error, response) => {
             res.send(response);
         });
     });
 });

/**
 * Weather app related express blocks ends here !!
 */


 app.get('/messages/:id', (req, res) => {
    let id = Number(req.params.id);
     collections.insert(data[id-1]).then(
         result => {
            // console.log(result);
             MongoClient.close();
         })
         .catch(error => console.error(error));
     res.send(data[id-1]);
 });

/**
 * Router chaining -> lets us chain different response based on the http method for same endpoint.
 * Use postman to verify, by varying the method type
 */
app.route('/route')
    .get(((req, res) => {
        res.send(data);
    }))
    .put(((req, res) => {
        res.send("Hello !!");
    }));

 /**
  App routes end here.
  */

 /**
  App listening on port --
  */
 app.listen(port, () => {
    console.log(`listening on port : ${port}`);
 });
