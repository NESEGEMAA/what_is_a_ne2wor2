const { getDb } = require("../controller/db");
const registration = async (username, password) => {
  try {
    let user = getDb();
    if (!username) {
      throw new Error("please enter a username");
    }
    if (!password) {
      throw new Error("please enter a password");
    }
    const checkUnique = await user
      .collection("users")
      .find({ username })
      .toArray();
    console.log(checkUnique);
    if (checkUnique.length > 0) {
      throw new Error("please enter a unique username");
    }
    let body = {
      username: username,
      password: password,
      wantToGo: [],
    };
    await user.collection("users").insertOne(body);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registration };
