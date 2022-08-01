const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");
const adminController = require("../controller/admin/index");

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
router.post("/", middleware, (req, res) => {
  return adminController.addProduct(req, res);
});
// router.post("/", (req, res) => {
//   const {
//     product_id,
//     sku,
//     name,
//     price,
//     weight,
//     descriptions,
//     thumbnail,
//     image,
//     category,
//     create_date,
//     stock,
//   } = req.body;
//   try {
//     con.query(
//       `INSERT INTO products (product_id, sku, name, price, weight, descriptions, thumbnail, image, category, create_date, stock) values ("${product_id}","${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}", "${image}","${category}", "${create_date}", "${stock}")`,
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

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
  if (req.user.user_type === "admin") {
    try {
      let sql = "SELECT * FROM products WHERE ? ";
      let product = { product_id: req.params.id };
      con.query(sql, product, (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
          let updateSql = `UPDATE products SET ? WHERE product_id = ${req.params.id}`;
          let updateProduct = {
            sku: req.body.sku,
            name: req.body.name,
            price: req.body.price,
            weight: req.body.weight,
            descriptions: req.body.descriptions,
            thumbnail: req.body.thumbnail,
            image: req.body.image,
            category: req.body.category,
            create_date: req.body.create_date,
            stock: req.body.stock,
          };
          con.query(updateSql, updateProduct, (err, updated) => {
            if (err) throw err;
            res.send("Successfully updated Product");
          });
        } else {
          res.send("Product not found");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// router.put("/:id", (req, res) => {
//   const {
//     product_id,
//     sku,
//     name,
//     price,
//     weight,
//     descriptions,
//     thumbnail,
//     image,
//     category,
//     create_date,
//     stock,
//   } = req.body;
//   try {
//     con.query(
//       `UPDATE products SET product_id="${product_id}", sku="${sku}", name="${name}", price="${price}", weight="${weight}", descriptions="${descriptions}", thumbnail="${thumbnail}", image="${image}", category="${category}", create_date="${create_date}", stock="${stock}" WHERE product_id= ${req.params.id}`,
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

// DELETE A PRODUCT
router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin")
    try {
      let sql = "Delete from products WHERE ?";
      let product = { product_id: req.params.id };
      con.query(sql, product, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
});
module.exports = router;
