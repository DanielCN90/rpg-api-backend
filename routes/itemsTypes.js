var express = require("express");
const  client_config  = require("../services/database");


var router = express.Router();

/* Database configuration */
let dbname = "rpg-api";
let dbcollection = "item-type";
let client = client_config;
const db = client.db(dbname);
const collection = db.collection(dbcollection);

/* GET items listing. */
router.get("/", function (req, res, next) {
  async function request() {
    try {
      await client.connect();
      const elementos = await collection.find({}).toArray();
      res.json(elementos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener elementos" });
    } finally {
      await client.close();
    }
  }
  request();
});


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Database configuration */

let dbcollection2 = "items";
let client2 = client_config;
const db2 = client2.db(dbname);
const collection2 = db2.collection(dbcollection2);


/* GET item by id. */
router.get("/:name", function (req, res, next) {
  async function run() {
    try {
      await client2.connect();
      console.log(req.params);
      let typeCase = capitalizeFirstLetter(req.params.name.toLocaleLowerCase());
      const elementos = await collection2.find({ type: typeCase }).toArray();
      if(res)
      res.json(elementos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener por nombre de categoria" });
    } finally {
      // Ensures that the client will close when you finish/error
      await client2.close();
    }
  }
  run();
});

module.exports = router;
