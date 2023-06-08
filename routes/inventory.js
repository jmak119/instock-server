const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

// GET INVENTORY DATA
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("inventories")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send("Error getting inventories");
    });
});

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
  if (!req.body.item_name || !req.body.description) {
    return res.status(400).json({
      message: "Please do not leave any fields blank",
    });
  }

  if (req.body.quantity === 0 && req.body.status === "In Stock") {
    return res.status(400).json({
      message: `If item quantity is 0, set to "Out of Stock"`,
    });
  }
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
