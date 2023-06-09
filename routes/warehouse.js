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
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Unable to retrieve warehouse data for warehouse with ID: ${req.params.id}`,
      });
    });
});

router.put("/:id", (req, res) => {
  delete req.body.created_at;
  delete req.body.updated_at;
  knex("warehouses")
    .update(req.body)
    .where({ id: req.params.id })
    .then((data) => {
      if (data === 0) {
        res.status(404).send(`Warehouse with ID: ${req.params.id} not found`);
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating warehouse");
    });
});

router.post("/", (req, res) => {
  delete req.body.created_at;
  delete req.body.updated_at;

  if (
    req.body.warehouse_name === "" ||
    req.body.address === "" ||
    req.body.city === "" ||
    req.body.country === "" ||
    req.body.contact_name === "" ||
    req.body.contact_position === "" ||
    req.body.contact_phone === "" ||
    req.body.contact_email === ""
  ) {
    return res.status(400).json({
      message: "Please do not leave any fields blank",
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  console.log(!emailPattern.test(req.body.contact_email));
  console.log(req.body.contact_email);
  console.log(!phonePattern.test(req.body.contact_phone));
  console.log(req.body.contact_phone);

  if (
    !emailPattern.test(req.body.contact_email) ||
    !phonePattern.test(req.body.contact_phone)
  ) {
    return res.status(400).json({
      message: "Invalid email address or phone number",
    });
  }

  knex("warehouses")
    .insert(req.body)
    .then(([id]) => knex("warehouses").select("*").where({ id }))
    .then(([data]) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send("Error adding warehouse");
    });
});

module.exports = router;
