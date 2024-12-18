const { getDb } = require("../controller/db");
const registration = async (username, password) => {
  try {
    let db = getDb();
    if (!username) {
      throw new Error("please enter a username");
    }
    if (!password) {
      throw new Error("please enter a password");
    }
    const checkUnique = await db
      .collection("myCollection")
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
    await db.collection("myCollection").insertOne(body);
  } catch (error) {
    throw new Error(error.message);
  }
};

const addToWantToGoList = async (username, destinationName) => {
  try {
    let db = getDb();

    if (!username) {
      throw new Error("Username is required");
    }

    if (!destinationName) {
      throw new Error("Destination name is required");
    }

    // Add the destination to the user's Want-to-Go list
    await db.collection("myCollection").updateOne(
      { username: username },
      { $addToSet: { wantToGo: destinationName } } // Ensure no duplicates
    );

    return { message: "Destination added to Want-to-Go list", destinationName };
  } catch (error) {
    console.error("Error adding to Want-to-Go list:", error);
    throw new Error(error.message);
  }
};

module.exports = { registration, addToWantToGoList };
