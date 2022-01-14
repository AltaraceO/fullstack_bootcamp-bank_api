const fs = require("fs");

const getUsers = () => {
  try {
    const buffer = fs.readFileSync("./data/users.json");
    const dataJson = buffer.toString();
    return JSON.parse(dataJson);
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
    return `${currUser.userName}'s balance is now ${currUser.cash}`;
  } else {
    throw Error(`id: ${id} not found`);
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
};
