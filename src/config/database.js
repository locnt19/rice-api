require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
  console.log("Connection to database failed:" + err);
});

mongoose.connection.once("open", () => {
  console.log("Successfully connected to the database!");
});
