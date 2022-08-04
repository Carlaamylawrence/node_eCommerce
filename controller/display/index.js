// GET ALL USER
async function getUsers(req, res) {
  try {
    let sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}

function show(data) {
  let table = `<tr>
                <th>full_name</th>
                <th>password</th>
                <th>email</th>
                <th>billing_address</th>
                <th>default_shipping_address</th>
                <th>country</th>
                <th>phone</th>
                <th>user_type</th>
                </tr>`;
  for (let r of data) {
    table += ` <tr>
                    <td> ${r.full_name}</td>
                    <td> ${r.password}</td>
                    <td> ${r.email}</td>
                    <td> ${r.billing_address}</td>
                    <td> ${r.default_shipping_address}</td>
                    <td> ${r.country}</td>
                    <td> ${r.phone}</td>
                    <td> ${r.user_type}</td>
                    </tr>`;
  }
  document.getElementById("users").innerHTML = table;
}

// GET A SINGLE USER
async function getSingleUser(req, res) {
  try {
    con.query(
      `SELECT * FROM users where user_id= ${req.user.id} `,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
module.exports = {
  getUsers,
  getSingleUser,
};
