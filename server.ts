/**
 * Imports starts here!
  */

 const express = require('express');
 const bodyParser = require('body-parser');
 const corsOrigin = require('./corsOrigin.ts');
 const data = require('./data/MOCK_DATA.json');
 const cors = require('cors');
 const app = express();
 const port = 1234;
 const MongoClient = require('mongodb').MongoClient;

/**
 *  Imports ends here !!
 */

/**
 * let(s) are declared here.
 * ConnectionString : connects to the database's connection/(table like).
 */

let connectionString = 'mongodb+srv://mani:7299728050O@cluster0-bgmld.mongodb.net/ProjectNode?retryWrites=true&w=majority';

/*
 cors origin and other use.
 */
app.use(cors(corsOrigin));
app.use(express.static('StaticFile'));
app.use(bodyParser.urlencoded({extended: true}));


/**
 * DB related block. DB: Mongo DB.
 * UnifiedTopology - Included to avoid the deprecated warnings.
 */

 MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
    client.close();
 });

/**
 * DB related code block ends here!!
 */


/*
 App routes starts here.
 */
 app.get('/', (req, res) => {
   res.send("Hello");
 });

 app.get('/messages', (req, res) => {
     res.send(data);
 });
 app.get('/messages/:id', (req, res) => {
    let id = Number(req.params.id);
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

 /*
  App routes end here.
  */

 /*
  App listening on port --
  */
 app.listen(port, () => {
    console.log(`listening on port : ${port}`);
 });
