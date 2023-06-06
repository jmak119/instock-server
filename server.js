const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json());

// const inventoryRoutes = require("./routes/inventory");
// app.use("/inventory", inventoryRoutes);

// const warehouseRoutes = require("./routes/warehouse");
// app.use("/warehouse", warehouseRoutes);
const knex = require("knex")(require("./knexfile"));
// LISTENER
app.listen(8080, () => {
  console.log("Listening on 8080");
});

// GET WAREHOUSE DATA
app.get("/warehouses", (req, res) => {
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
