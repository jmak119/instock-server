const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// GET WAREHOUSE DATA
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("warehouses")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send("Error getting warehouses");
    });
});

module.exports = router;
