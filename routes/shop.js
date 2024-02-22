var express = require("express");
const  client_config  = require("../services/database");


var router = express.Router();

/* Database configuration */
let dbname = "rpg-api";
let dbcollection = "items";
let client = client_config;
const db = client.db(dbname);
const collection = db.collection(dbcollection);


// Ruta para obtener 10 elementos aleatorios
router.get('/', async (req, res) => {
  try {
      // Conectar a la base de datos
      await client.connect();
      // Agregar una etapa de aleatoriedad al pipeline de agregación
      const pipeline = [
          { $sample: { size: 10 } } // Obtener 10 elementos aleatorios
      ];
      // Ejecutar la agregación en la colección MongoDB
      const result = await collection.aggregate(pipeline).toArray();
      // Responder con los resultados
      res.json(result);
  } catch (error) {
      console.error('Error al obtener los elementos aleatorios:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
      // Cerrar la conexión a la base de datos al finalizar
      await client.close();
  }
});

module.exports = router;
