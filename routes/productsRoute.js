const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");
const adminController = require("../controller/admin/index");
const displayController = require("../controller/display/index");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  return displayController.getProducts(req, res);
});

//ADD A PRODUCT
router.post("/", middleware, (req, res) => {
  return adminController.addProduct(req, res);
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
router.put("/:id", middleware, (req, res) => {
  return adminController.editProduct(req, res);
});

// DELETE A PRODUCT
router.delete("/:id", middleware, (req, res) => {
  return adminController.deleteProduct(req, res);
});
module.exports = router;
