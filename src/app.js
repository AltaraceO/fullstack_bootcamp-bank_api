const express = require("express");
const app = express();
const { getUsers, createUsers } = require("./utils");

app.use(express.json());

//

app.get("/users", (req, res) => {
  console.log(req.body);
  res.send(getUsers());
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send(createUsers(req.body));
});

//

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server 3000 is up");
});
