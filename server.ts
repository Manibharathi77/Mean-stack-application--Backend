/**
 * Imports starts here!
  */
const express = require('express');
 const corsOrigin = require('./corsOrigin.ts');
 const data = require('./data/MOCK_DATA.json');
 const cors = require('cors');
 const app = express();
 const port = 1234;

/**
 *  Imports ends here !!
 */

/*
 cors origin
 */
 app.use(cors(corsOrigin));
 app.use(express.static('StaticFile'));

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

 /*
  App routes end here.
  */

 /*
  App listen block
  */
app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});
