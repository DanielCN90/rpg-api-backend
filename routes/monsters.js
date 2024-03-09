var express = require("express");
var router = express.Router();


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://danielcn9003:swnF5rWa2cdN49qf@cluster0.2bpp1fh.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("rpg-api");
const collection = db.collection("monsters");



router.get("/", function (req, res, next) {
  async function request() {
    try {
      await client.connect();
      const elementos = await collection.find({}).toArray();
      res.json(elementos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error al obtener elementos" });
    } finally {
      await client.close();
    }
  }
  request();
});


router.get("/:id", function (req, res, next) {
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const elemento = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!elemento || elemento == null) {
        return res.status(404).json({ mensaje: "Elemento no encontrado" });
      }
      res.json(elemento);
    } catch (error) {
      console.error(error);
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
