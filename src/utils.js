const fs = require("fs");

const getUsers = () => {
  try {
    const buffer = fs.readFileSync("./data/users.json");
    const dataJson = buffer.toString();
    const result = JSON.parse(dataJson);
    return result;
  } catch (e) {
    return [];
  }
};

const createUsers = ({ userName, id, cash, credit }) => {
  const users = getUsers();

  users.find((user) => {
    if (user.id === id) {
      throw Error(`user id:${id} already exists`);
    }
  });
  const newUser = {
    userName,
    id,
    cash,
    credit,
  };

  users.push(newUser);
  updateUsers(users);
  return `Added ${newUser.userName}`;
};

const updateUsers = (newData) => {
  const dataToJson = JSON.stringify(newData);
  fs.writeFileSync("./data/users.json", dataToJson);
};

const userDeposit = (id, amount) => {
  checkNumbers(amount);

  const users = getUsers();
  const currUser = users.find((user) => user.id === Number(id));

  if (currUser) {
    currUser.cash += amount;
    updateUsers(users);
    return currUser;
    // return `${currUser.userName}'s balance is now ${currUser.cash}`;
  } else {
    throw Error(`id: ${id} not found`);
  }
};

const changeUserCredit = (id, amount) => {
  checkNumbers(amount);

  const users = getUsers();
  const currUser = users.find((user) => user.id === Number(id));

  if (currUser) {
    currUser.credit = amount;
    updateUsers(users);
    return `${currUser.userName}'s credit is now ${currUser.credit}`;
  } else {
    throw Error(`id: ${id} not found`);
  }
};

const withdrawCash = (id, amount) => {
  checkNumbers(amount);

  const users = getUsers();
  const currUser = users.find((user) => user.id === Number(id));

  if (currUser) {
    if (currUser.cash + currUser.credit < amount) {
      throw Error(`Unable to withdraw ${amount}, increase cash or credit`);
    }
    currUser.cash -= amount;
    updateUsers(users);
    return `${currUser.userName}'s balance is now ${currUser.cash}`;
  } else {
    throw Error(`id: ${id} not found`);
  }
};

const moneyTransfer = (fromId, toId, amount) => {
  const users = getUsers();
  const fromUser = users.find((user) => user.id === Number(fromId));
  const toUser = users.find((user) => user.id === Number(toId));
  if (fromUser && toUser) {
    checkNumbers(amount);
    withdrawCash(fromId, amount);
    userDeposit(toId, amount);
    return `${amount} was transferred from ${fromUser.userName} to ${toUser.userName}`;
  } else {
    throw Error(`check user ID`);
  }
};

const checkNumbers = (amount) => {
  const confNum = typeof amount === "number";
  if (amount < 1) {
    throw Error(`amout must be higher than 1`);
  }
  if (!confNum) {
    throw Error(`Amount must only contain numbers`);
  }
};

module.exports = {
  getUsers,
  createUsers,
  userDeposit,
  changeUserCredit,
  withdrawCash,
  moneyTransfer,
};
