const api_url = "http://localhost:6969";
// let token = window.localStorage.getItem("user.token");
// let user = JSON.parse(window.localStorage(getItem("user")));

async function getUsers(url) {
  const response = await fetch(url + "/" + "users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (data.length === 0) {
    alert("Table Users is empty");
  } else {
    show(data);
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

getUsers(api_url);
// show(data);
// GET SINGLE USER

async function getSingleUser(url) {
  const response = await fetch(url + "/" + "users" + "/:id", {
    method: "GET",
    headers: {
      "x-auth-token": "${token}",
    }
      .then((response) => response.json())
      .then((data) => {
        user = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      }),
  });
}

getSingleUser(api_url);
