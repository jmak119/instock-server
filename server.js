const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.json());

const inventoryRoutes = require("./routes/inventory");
app.use("/inventory", inventoryRoutes);

const warehouseRoutes = require("./routes/warehouse");
app.use("/warehouse", warehouseRoutes);

// LISTENER
app.listen(8080, () => {
  console.log("Listening on 8080");
});
