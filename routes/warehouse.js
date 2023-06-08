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
    .select("*")
    .from("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting warehouse");
    });
});

// router.put('/warehouse/edit/:id', (req, res) => {
//   knex("warehouses")
//   .update(req.body)
//     .where({ id: req.params.id })
//     .then((data) => {
//       console.log(data);
//       res.status(200).json(data[0]);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error updating warehouse");
//     });
// });
router.use("/warehouse/edit/:id", (req, res) => {
  const id = req.params.id;
  knex("warehouses")
    .update(req.body)
    .where({ id })
    .first()
    .then((warehouse) => {
      if (!warehouse) {
        res.status(404).send(`Warehouse with ID ${id} not found`);
      } else {
        res.status(200).json(warehouse);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving warehouse");
    });
});

module.exports = router;
