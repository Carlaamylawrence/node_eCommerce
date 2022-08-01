const bcrypt = require("bcryptjs");
const con = require("../../lib/db_connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function addProduct(req, res) {
  if (req.user.user_type === "admin")
    try {
      let date = new Date().toISOString().slice(0, 19).replace("T", " ");
      let sql = "INSERT INTO products SET ?";
      let product = ({
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        descriptions: req.body.descriptions,
        thumbnail: req.body.thumbnail,
        image: req.body.image,
        category: req.body.category,
        create_date: date,
        stock: req.body.stock,
      } = req.body);
      con.query(sql, product, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  else {
    res.send("Not Allowed");
  }
}

module.exports = {
  addProduct,
};
