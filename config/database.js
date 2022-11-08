const mongoose = require("mongoose");
const config = require("./config");

const DB_URL = config.dbUrl.url;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Mongodb Is Conected`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
