const { MongoClient } = require("mongodb");
let dbConnection;
// connecting to the db
// cb is a call back function so in the future when connecting to the db we will pass as an argument a call back function that we want to excute when
// we are connected to th db
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://127.0.0.1:27017/myDB")
      .then((client) => {
        // client is an object that represents the client created when connected to the db and this object has a function called db()
        //that allows us to connect ro the db
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  // retrive db connection when we are connected
  getDb: () => dbConnection,
};
