let token = window.localStorage.getItem("user.token");
let user = JSON.parse(window.localStorage(getItem("user")));

async function checkUser(url) {
  let user = JSON.parse(window.localStorage(getItem("user")));
  if (user === null || user === undefined || !user) {
    alert("Not Allowed");
    window.location.href = "index.html";
  } else {
    if (user.user_type !== "admin") {
      window.location.href = "index.html";
    } else {
      const response = await fetch(url + "/" + "users");

      let data = await response.json();
      show(data);
    }
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
show(data);

async function verifyUser(url) {
  let response = await fetch(url + "/" + "users" + "/" + "verify", {
    method: "GET",
    headers: {
      "Content-Type": "applictaion/json",
      "x-auth-token": "",
    },
  });

  let data = await response.json();
  if (data.msg) {
    alert(data.msg);
  } else {
    window.localStorage.setItem("user", JSON.stringify(data));
  }
}

verifyUser(url);
