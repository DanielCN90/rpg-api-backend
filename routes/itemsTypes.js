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





module.exports = router;
