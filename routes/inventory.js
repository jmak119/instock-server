const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// GET INVENTORY ITEM DATA
router.get("/:id", (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((itemsFound) => {
      if (itemsFound.length === 0) {
        return res.status(404).json({
          message: `Inventory Item with ID: ${req.params.id} not found`,
        });
      }
      const itemData = itemsFound[0];
      res.status(200).json(itemData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve inventory item data for item with ID: ${req.params.id}`,
      });
    });
});

// PUT/EDIT INVENTORY ITEM DATA
router.put("/:id", (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .update(req.body)
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: `Unable to update inventory item with ID: ${req.params.id}`,
      });
    });
});

module.exports = router;
