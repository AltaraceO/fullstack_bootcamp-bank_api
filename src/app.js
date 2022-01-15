const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();
const {
  getUsers,
  createUsers,
  userDeposit,
  changeUserCredit,
  withdrawCash,
  moneyTransfer,
} = require("./utils");

app.use(express.json());

const publicDir = path.join(__dirname, " ../public");
const viewsPath = path.join(__dirname, "../views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDir));

console.log(__dirname);
//

app.get("", (req, res) => {
  res.render("index", {
    thing: getUsers().map((e) => e),
  });
});

app.post("/users", (req, res) => {
  res.status(200).send(createUsers(req.body));
});

//structure:
//{
//     "userName": "Beth",
//     "id": 6,
//     "cash": 0,
//     "credit": 100
// }

app.get("/deposits", (req, res) => {
  res.render("deposits", {
    thing: "something",
  });
});

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
app.put("/transfer/:from/:to", (req, res) => {
  const from = req.params.from;
  const to = req.params.to;
  const amt = req.body.amount;

  res.send(moneyTransfer(from, to, amt));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server 3000 is up");
});
