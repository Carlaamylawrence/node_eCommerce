const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const bcrypt = require("bcryptjs");

// GET ALL USERS
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//ADD A USER
router.post("/", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;
  try {
    con.query(
      `INSERT INTO users (email, password, full_name, billing_address, default_shipping_address, country, phone, user_type) values ("${email}","${password}","${full_name}","${billing_address}","${default_shipping_address}","${country}","${phone}", "${user_type}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// GET SINGLE USER
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM users where user_id= ${req.params.id} `,
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

//EDIT A USER
router.put("/:id", (req, res) => {
  const {
    email,
    password,
    full_name,
    billing_address,
    default_shipping_address,
    country,
    phone,
    user_type,
  } = req.body;
  try {
    con.query(
      `UPDATE users SET email="${email}", password="${password}", full_name="${full_name}", billing_address="${billing_address}", default_shipping_address="${default_shipping_address}", country="${country}", phone="${phone}", user_type="${user_type}" WHERE user_id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// DELETE A USER
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `Delete from users WHERE user_id= ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// LOGIN
// router.patch("/", (req, res) => {
//   const { email, password } = req.body;
//   try {
//     con.query(
//       `SELECT * FROM users WHERE email="${email}" AND password="${password}"`,
//       (err, result) => {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

// Register
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      full_name,
      email,
      phone,
      user_type,
      country,
      billing_address,
      default_shipping_address,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let user = {
      full_name,
      email,
      // We sending the hash value to be stored witin the table
      password: hash,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

// Login
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        // Decryption
        // Accepts the password stored in database and the password given by user (req.body)
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password does not match
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          res.send(result);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
