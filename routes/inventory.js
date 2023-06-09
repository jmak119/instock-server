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
      message: `Quantity must be a number greater than 0`,
    });
  }

  if (isNaN(Number(req.body.quantity))) {
    return res.status(400).json({
      message: `Quantity must be a number greater than 0`,
    });
  }

  knex("inventories")
    .where({ id: req.params.id })
    .update(req.body)
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({
          message: `Inventory item with ID: ${req.params.id} not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: `Unable to update inventory item with ID: ${req.params.id}`,
      });
    });
});

// ADD NEW INVENTORY ITEM
router.post("/", (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.warehouse_id ||
    !req.body.quantity
  ) {
    return res.status(400).json({
      message: "Please do not leave any fields blank",
    });
  }

  if (req.body.quantity === 0 && req.body.status === "In Stock") {
    return res.status(400).json({
      message: `Quantity must be a number greater than 0`,
    });
  }

  if (isNaN(Number(req.body.quantity))) {
    return res.status(400).json({
      message: `Quantity must be a number greater than 0`,
    });
  }

  knex("inventories")
    .insert(req.body)
    .then((result) => {
      return knex("inventories").where({ id: result[0] });
    })
    .then((createdItem) => {
      res.status(201).json(createdItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Unable to create new item" });
    });
});

module.exports = router;
