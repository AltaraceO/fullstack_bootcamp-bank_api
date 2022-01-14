const express = require("express");
const app = express();
const {
  getUsers,
  createUsers,
  userDeposit,
  changeUserCredit,
  withdrawCash,
} = require("./utils");

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

//structure:
//{
//     "userName": "Beth",
//     "id": 6,
//     "cash": 0,
//     "credit": 100
// }

app.put("/deposit/:id", (req, res) => {
  const userId = req.params.id;
  const depAmnt = req.body.amount;
  res.send(userDeposit(userId, depAmnt));
});

app.put("/credit/:id", (req, res) => {
  const userId = req.params.id;
  const credAmnt = req.body.amount;
  res.send(changeUserCredit(userId, credAmnt));
});

app.put("/withdraw/:id", (req, res) => {
  const userId = req.params.id;
  const depAmnt = req.body.amount;
  res.send(withdrawCash(userId, depAmnt));
});

//structure:
// {
//     "amount" : 3330
// }

//

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server 3000 is up");
});
