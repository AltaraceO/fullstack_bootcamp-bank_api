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

module.exports = {
  getUsers,
  createUsers,
};
