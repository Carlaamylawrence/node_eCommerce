const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//ADD A PRODUCT
router.post("/", (req, res) => {
  const {
    product_id,
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  try {
    con.query(
      `INSERT INTO products (product_id, sku, name, price, weight, descriptions, thumbnail, image, category, create_date, stock) values ("${product_id}","${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}", "${image}","${category}", "${create_date}", "${stock}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// GET SINGLE PRODUCT
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products where product_id= ${req.params.id} `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//EDIT A PRODUCT
router.put("/:id", (req, res) => {
  const {
    product_id,
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  try {
    con.query(
      `UPDATE products SET product_id="${product_id}", sku="${sku}", name="${name}", price="${price}", weight="${weight}", descriptions="${descriptions}", thumbnail="${thumbnail}", image="${image}", category="${category}", create_date="${create_date}", stock="${stock}" WHERE product_id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// DELETE A PRODUCT
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `Delete from products WHERE product_id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
