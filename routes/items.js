var express = require("express");
const client_config = require("../services/database");

var router = express.Router();

/* Database configuration */
let dbname = "rpg-api";
let dbcollection = "items";
let client = client_config;
const db = client.db(dbname);
const collection = db.collection(dbcollection);


/* GET items listing */
router.get("/", function (req, res, next) {
  async function run() {
    try {
      await client.connect();
      let filter = { type: req.query.type };
      if (!req.query.type) filter = {};
      const elementos = await collection.find(filter).toArray();
      res.json(elementos);
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al obtener por nombre de categoria" });
    } finally {
      await client.close();
    }
  }
  run();
});

/* GET item by id. */
router.get("/:id", function (req, res, next) {
  async function run() {
    try {
      await client.connect();
      const elemento = await collection.findOne({ id: req.params.id });
      if (!elemento || elemento == null) {
        return res.status(404).json({ mensaje: "Elemento no encontrado" });
      }
      res.json(elemento);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener por ID" });
    } finally {
      await client.close();
    }
  }
  run();
});

/*POST Item simulated */
router.post("/", function (req, res, next) {
  setTimeout(() => {
    res.status(200).json({ message: "Item created successfully" });
  }, 1000);
});

/*POST Item simulated */
router.put("/", function (req, res, next) {
  setTimeout(() => {
    res.status(200).json({ message: "Item updated successfully" });
  }, 1000);
});

/* DELETE Item simulated */
router.delete("/:id", function (req, res, next) {
  setTimeout(() => {
    res.status(200).json({ message: "Item deleted successfully" });
  }, 1000);
});

/* POST Items in batch */
router.post("/multiple", function (req, res, next) {
  async function run() {
    try {
      await client.connect();
      await collection.insertMany(req.body).then((a) => res.send(a));
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
