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

















router.get("/:id", (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((warehousesFound) => {
      if (warehousesFound.length === 0) {
        return res.status(404).json({
          message: `Warehouse with ID: ${req.params.id} not found`,
        });
      }
      const warehouseData = warehousesFound[0];
      res.status(200).json(warehouseData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve warehouse data for warehouse with ID: ${req.params.id}`,
      });
    });
});


module.exports = router;
