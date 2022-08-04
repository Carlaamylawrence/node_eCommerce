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
