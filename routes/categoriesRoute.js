const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GET ALL CATEGORIES
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//ADD A CATEGORY
router.post("/", (req, res) => {
  const { category_id, name, description, thumbnail } = req.body;
  try {
    con.query(
      `INSERT INTO categories (category_id, name, description, thumbnail) values ("${category_id}","${name}","${description}","${thumbnail}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// GET SINGLE CATEGORY
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories where category_id= ${req.params.id} `,
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

//EDIT A CATEGORY
router.put("/:id", (req, res) => {
  const { category_id, name, description, thumbnail } = req.body;
  try {
    con.query(
      `UPDATE categories SET category_id="${category_id}", name="${name}", description="${description}", thumbnail="${thumbnail}" WHERE category_id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// DELETE A CATEGORY
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `Delete from categories WHERE category_id= ${req.params.id}`,
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
