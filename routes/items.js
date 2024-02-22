var express = require("express");
const  client_config  = require("../services/database");


var router = express.Router();

/* Database configuration */
let dbname = "rpg-api";
let dbcollection = "items";
let client = client_config;
const db = client.db(dbname);
const collection = db.collection(dbcollection);

/* GET items listing. */



/* GET item by id. */
router.get("/", function (req, res, next) {
 
  async function run() {
    try {
      await client.connect();
     
      let filter = { type : req.query.type }; 
      if(!req.query.type) filter ={};
      const elementos = await collection.find(filter).toArray();
      res.json(elementos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener por nombre de categoria" });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run();
});

/* GET item by id. */
router.get("/:id", function (req, res, next) {
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const elemento = await collection.findOne({ id: req.params.id });
      if (!elemento || elemento == null) {
        return res.status(404).json({ mensaje: "Elemento no encontrado" });
      }
      res.json(elemento);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener por ID" });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run();
});






/* GET users listing. */
router.post("/", function (req, res, next) {
  console.log(req.body);

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      await collection.insertOne(req.body).then((a) => res.send(a));
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});



/* GET users listing. */
router.post("/multiple", function (req, res, next) {
    console.log(req.body);
  
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log(req);
        await collection.insertMany(req.body).then((a) => res.send(a));
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
  });
  
  


/* DELETE users listing. */
router.delete("/:id", function (req, res, next) {
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      await collection
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((a) => res.send(a));
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
