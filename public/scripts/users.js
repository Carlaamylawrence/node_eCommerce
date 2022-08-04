const api_url = "https://thisisyourstore.herokuapp.com";
// let token = window.localStorage.getItem("user.token");
// let user = JSON.parse(window.localStorage(getItem("user")));

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
