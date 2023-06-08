const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// GET WAREHOUSE DATA
router.get("/", (req, res) => {
  knex("warehouses")
    .select("*")
    .from("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send("Error getting warehouses");
    });
});

router.delete("/:id", (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.status(204).json(data);
    })
    .catch((err) => {
      res.status(404).send("Error deleting warehouse");
    });
});




module.exports = router;
